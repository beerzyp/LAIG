#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float colorScale;

void main() {
	vec4 colorA = texture2D(uSampler, vTextureCoord);
	vec4 colorB = vec4(1.000,0.833,0.224, 1);
	vec4 color = vec4(mix(colorA.rgb, colorB.rgb, colorScale), colorA.a);
	
	//color.r = color.r * colorScale  + color.g * 			+ color.b;
	//color.g = color.r				+ color.g * colorScale  + color.b;
	//color.b = color.r 				+ color.g 				+ color.b * colorScale;

	gl_FragColor = color;
}