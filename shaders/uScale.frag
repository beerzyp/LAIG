#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float colorScale;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	color.r = color.r * colorScale  + color.g * 			+ color.b;
	color.g = color.r				+ color.g * colorScale  + color.b;
	color.b = color.r 				+ color.g 				+ color.b * colorScale;

	gl_FragColor = color;
}