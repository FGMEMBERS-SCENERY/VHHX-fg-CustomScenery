// -*-C++-*-

// Ambient term comes in gl_Color.rgb.
//
// See http://wiki.flightgear.org/index.php/Howto:_Lightmap for details on
// how to use it.

varying vec3	viewerdir;
varying vec3	ecPosition;
varying vec3	normal;
varying	vec3	VTangent;
varying	vec3	VBinormal;
varying	vec3	VNormal;

uniform sampler2D	baseTex;
uniform sampler2D	lightTex;
uniform sampler3D	noiseTex;

uniform float	osg_SimulationTime;
uniform float	speedFactor;
uniform float	baseDensity;

////fog "include" /////
uniform int fogType;

vec3 fog_Func(vec3 color, int type);
//////////////////////


void main()
{

    float pf;
    vec4 fragColor;
    vec4 specular = vec4(1.0);
    vec3 N = normalize(VNormal);
 
    float nDotVP = max(0.0, dot(N, normalize(gl_LightSource[0].position.xyz)));
	float nDotHV = max(0.0, dot(N, normalize(gl_LightSource[0].halfVector.xyz)));

	if (nDotVP == 0.0)
			pf = 0.0;
	else
			pf = pow(nDotHV, gl_FrontMaterial.shininess);
		
	vec4 Diffuse  = gl_LightSource[0].diffuse * nDotVP;
	vec4 Specular = gl_FrontMaterial.specular * gl_LightSource[0].specular * pf;
	vec4 color    = gl_Color + Diffuse * gl_FrontMaterial.diffuse;
	     color   += Specular * gl_FrontMaterial.specular;
	     color    = clamp( color, 0.0, 1.0 );

	vec4 baseTexel = texture2D(baseTex, gl_TexCoord[0].st);



	float tgAngle = dot(viewerdir, VTangent);
	float bnAngle = dot(viewerdir, VBinormal);
//	float tgAngle = dot(ecPosition, VTangent);
//	float bnAngle = dot(ecPosition, VBinormal);

	float texSCoord = (gl_TexCoord[0].s - 0.5)/.25;
	float roadSide = sign(0.5 - texSCoord);
	float texTCoord = gl_TexCoord[0].t + osg_SimulationTime * speedFactor * roadSide;

	vec4 noiseTexel = texture3D(noiseTex, vec3(0.0,texTCoord * 0.1,0.0) * 0.005);
	float density = noiseTexel.r*noiseTexel.g*noiseTexel.b * 300.0;
	      density = floor(density * 7.0);



	//tgAngle *=  sign(bnAngle);                                // fix for reversed uv coords
	bnAngle *=  roadSide;
	tgAngle *=  roadSide;

	vec3 lightmapTexel = texture2D(lightTex, -vec2(texSCoord * 2.0, texTCoord * roadSide)).rgb;
	vec3 carTexel = vec3(mod(texTCoord,  23.0) *.043,  mod(texTCoord, 17.0) * .0588,  mod(texTCoord, 13.0) * .077) * lightmapTexel.b;
// 	float headLights = step (0.5, 0.5 - bnAngle * 0.5 );
// 	float tailLights = step (0.5, 0.5 + bnAngle * 0.5 );
	float headLights = 0.1 + 0.9 * smoothstep (0.35, 0.65, 0.5 - bnAngle * 0.5 );
	float tailLights = 0.1 + 0.9 * smoothstep (0.35, 0.65, 0.5 + bnAngle * 0.5 );

	vec3 lightTexel = smoothstep(0.05,1.0,lightmapTexel.g)* headLights * vec3(1.0,1.0,.85)
					+ smoothstep(0.1,0.7,lightmapTexel.r) * tailLights * vec3(1.0,0.25,0.0);
// 	vec3 lightTexel = smoothstep(0.05,1.0,lightmapTexel.g)* (0.5 - bnAngle * 0.5) * vec3(1.0,1.0,.95)
// 					+ smoothstep(0.1,0.7,lightmapTexel.r) * (0.5 + 0.5 * bnAngle) * vec3(1.0,0.5,0.0);

//     if(baseDensity >= 1.0 && mod(texTCoord,baseDensity)< 1.0){
// 		lightTexel = vec3(0.0);
// 	}else if (baseDensity < 1.0 && mod(texTCoord, 1.0/baseDensity) < 1.0/baseDensity -1.0){
// 		lightTexel = vec3(0.0);
// 	}else if (mod(texTCoord,21.0) < 14.0){
// 		if (mod (texTCoord , density) < 3.0 && mod(texTCoord, 3.0) <= 1.0 ){
// 				lightTexel = vec3(0.0);
// 		} else if (3.0 <= mod(texTCoord, density) && mod(texTCoord, density) < 6.0 && mod(texTCoord, 6.0) >= 5.0){
// 			lightTexel = vec3(0.0);
// 		}
// 	} else 	if (mod (texTCoord , density) < 6.0 && mod(texTCoord, 6.0) < 5.0 ){
// 			lightTexel = vec3(0.0);
// 	}

	float ro0 = step(1.0, baseDensity);
	ro0 *= 1.0 - step(1.0,mod(texTCoord,baseDensity)) * step(1.0/baseDensity - 1.0,mod(texTCoord, 1.0/baseDensity));
	ro0 *= 1.0 - step(17.0, mod(texTCoord, 21.0))
	           * step(3.0, mod(texTCoord,density))
			   * step(1.0, mod(texTCoord,3.0))
	           * step(6.0, mod(texTCoord, density))
			   * step(5.0, mod(texTCoord,6.0));
	ro0 *= step(14.0, mod(texTCoord, 21.0)) * (1.0 - step(5.0, mod(texTCoord,6.0)));

	ro0 *= 1.- step(5.0, mod(texTCoord,6.0));

	lightTexel *= ro0;
	carTexel *=  ro0;

	baseTexel.rgb += carTexel;
	fragColor = color * baseTexel;
	fragColor.a = 1.0;

	fragColor.rgb = max(fragColor.rgb, lightTexel * baseTexel.rgb);

//	fragColor.rgb = lightTexel;
	fragColor.rgb = fog_Func(fragColor.rgb, fogType);
	//fragColor.rgb = vec3(tgAngle);
	//fragColor.rgb = vec3(headLights, tailLights, 0.0);
	gl_FragColor = fragColor;
}