// This shader is mostly an adaptation of the shader found at
//  http://www.bonzaisoftware.com/water_tut.html and its glsl conversion
//  available at http://forum.bonzaisoftware.com/viewthread.php?tid=10
//   Michael Horsch - 2005
//  Major update and revisions - 2011-10-07
//   Emilian Huminiuc and Vivian Meazza

#version 120


varying vec3 viewerdir;
varying vec3 ecPosition;
//varying vec3 lightdir;
//varying vec3 normal;
varying	vec3	VTangent;
varying	vec3	VBinormal;
varying	vec3	VNormal;

uniform float osg_SimulationTime;

attribute	vec3	tangent;
attribute	vec3	binormal;
/////// functions /////////


void main(void)
    {
	ecPosition = (gl_ModelViewMatrix * gl_Vertex).xyz;
	VNormal = normalize(gl_NormalMatrix * gl_Normal);
	VTangent = normalize(gl_NormalMatrix * tangent);
	VBinormal = normalize(gl_NormalMatrix * binormal);
// 	VTangent = normalize(gl_ModelViewMatrix * vec4(tangent,0.0)).xyz;
// 	VBinormal = normalize(gl_ModelViewMatrix * vec4(binormal,0.0)).xyz;
	//normal = gl_Normal;
    viewerdir = normalize(gl_ModelViewMatrixInverse[3].xyz - gl_Vertex.xyz);
    gl_Position = ftransform();
	gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
		
	}