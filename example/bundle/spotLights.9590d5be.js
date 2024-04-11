let e,t,r,a,n,o,i,s;function l(e,t,r,a){Object.defineProperty(e,t,{get:r,set:a,enumerable:!0,configurable:!0})}var c=globalThis,d={},u={},h=c.parcelRequire5b70;null==h&&((h=function(e){if(e in d)return d[e].exports;if(e in u){var t=u[e];delete u[e];var r={id:e,exports:{}};return d[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){u[e]=t},c.parcelRequire5b70=h);var p=h.register;p("27Lyk",function(e,t){l(e.exports,"register",()=>r,e=>r=e),l(e.exports,"resolve",()=>a,e=>a=e);var r,a,n=new Map;r=function(e,t){for(var r=0;r<t.length-1;r+=2)n.set(t[r],{baseUrl:e,path:t[r+1]})},a=function(e){var t=n.get(e);if(null==t)throw Error("Could not resolve bundle with id "+e);return new URL(t.path,t.baseUrl).toString()}}),p("d4kES",function(e,t){l(e.exports,"PhysicalSpotLight",()=>a);var r=h("ilwiq");class a extends r.SpotLight{constructor(...e){super(...e),this.iesTexture=null,this.radius=0}copy(e,t){return super.copy(e,t),this.iesTexture=e.iesTexture,this.radius=e.radius,this}}}),p("8mHfG",function(e,t){l(e.exports,"WebGLPathTracer",()=>u);var r=h("ilwiq"),a=h("hWj76"),n=h("hWds8"),o=h("RPVlj"),i=h("bHiTZ"),s=h("9wqOU"),c=h("5rCKZ");let d=new r.Vector2;class u{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}constructor(e){this._renderer=e,this._generator=new a.PathTracingSceneGenerator,this._pathTracer=new n.PathTracingRenderer(e),this._queueReset=!1,this._clock=new r.Clock,this._lowResPathTracer=new n.PathTracingRenderer(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new o.FullScreenQuad(new c.ClampedInterpolationMaterial({map:null,transparent:!0,blending:r.NoBlending,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new r.Vector2(1024,1024),this.rasterizeSceneCallback=(e,t)=>{this._renderer.render(e,t)},this.renderToCanvasCallback=(e,t,r)=>{let a=t.autoClear;t.autoClear=!1,r.render(t),t.autoClear=a},this.setScene(new r.Scene,new r.PerspectiveCamera)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,r={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();let a=this._generator;if(a.setObjects(e),this._buildAsync)return a.generateAsync(r.onProgress).then(r=>this._updateFromResults(e,t,r));{let r=a.generate();return this._updateFromResults(e,t,r)}}setSceneAsync(...e){this._buildAsync=!0;let t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){let e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){let e=this._pathTracer.material,t=this._renderer,r=this._materials,a=this.textureSize,n=(0,s.getTextures)(r);e.textures.setTextures(t,n,a.x,a.y),e.materials.updateFrom(r,n),this.reset()}updateLights(){let e=this.scene,t=this._renderer,r=this._pathTracer.material,a=(0,s.getLights)(e),n=(0,s.getIesTextures)(a);r.lights.updateFrom(a,n),r.iesProfiles.setTextures(t,n),this.reset()}updateEnvironment(){let e=this.scene,t=this._pathTracer.material;if(t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),null===e.background)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new i.GradientEquirectTexture(16);let r=this._colorBackground;r.topColor.equals(e.background)||(r.topColor.set(e.background),r.bottomColor.set(e.background),r.update()),t.backgroundMap=r,t.backgroundAlpha=1}else t.backgroundMap=e.background,t.backgroundAlpha=1;t.environmentIntensity=e.environmentIntensity??1,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment&&(e.environment?t.envMapInfo.updateFrom(e.environment):t.environmentIntensity=0),this._previousEnvironment=e.environment,this.reset()}_updateFromResults(e,t,r){let{materials:a,geometry:n,bvh:o,bvhChanged:i}=r;this._materials=a;let s=this._pathTracer.material;return i&&(s.bvh.updateFrom(o),s.attributesArray.updateFrom(n.attributes.normal,n.attributes.tangent,n.attributes.uv,n.attributes.color),s.materialIndexAttribute.updateFrom(n.attributes.materialIndex)),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),r}renderSample(){let e=this._lowResPathTracer,t=this._pathTracer,a=this._renderer,n=this._clock,o=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,o.material.opacity=0,n.start());let i=1e3*n.getDelta(),s=1e3*n.getElapsedTime();if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=s&&t.update(),t.alpha=1!==t.material.backgroundAlpha||!a.extensions.get("EXT_float_blend"),e.alpha=t.alpha,this.renderToCanvas){let a=this._renderer,n=this.minSamples;if(s>=this.renderDelay&&this.samples>=this.minSamples&&(0!==this.fadeDuration?o.material.opacity=Math.min(o.material.opacity+i/this.fadeDuration,1):o.material.opacity=1),!this.enablePathTracing||this.samples<n||o.material.opacity<1){if(this.dynamicLowRes){e.samples<1&&(e.material=t.material,e.update());let r=o.material.opacity;o.material.opacity=1-o.material.opacity,o.material.map=e.target.texture,o.render(a),o.material.opacity=r}else this.rasterizeScene&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&o.material.opacity>0&&(o.material.opacity<1&&(o.material.blending=this.dynamicLowRes?r.AdditiveBlending:r.NormalBlending),o.material.map=t.target.texture,this.renderToCanvasCallback(t.target,a,o),o.material.blending=r.NoBlending)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._renderQuad.dispose(),this._renderQuad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(d);let e=Math.floor(this.renderScale*d.x),t=Math.floor(this.renderScale*d.y);if(this._pathTracer.getSize(d),d.x!==e||d.y!==t){let r=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*r),Math.floor(t*r))}}}}}),p("bHiTZ",function(e,t){l(e.exports,"GradientEquirectTexture",()=>o);var r=h("ilwiq"),a=h("dbdMq");let n=new r.Vector3;class o extends a.ProceduralEquirectTexture{constructor(e=512){super(e,e),this.topColor=new(0,r.Color)().set(16777215),this.bottomColor=new(0,r.Color)().set(0),this.exponent=2,this.generationCallback=(e,t,r,a)=>{n.setFromSpherical(e);let o=.5*n.y+.5;a.lerpColors(this.bottomColor,this.topColor,o**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}}}),p("dbdMq",function(e,t){l(e.exports,"ProceduralEquirectTexture",()=>s);var r=h("ilwiq");let a=new r.Vector2,n=new r.Vector2,o=new r.Spherical,i=new r.Color;class s extends r.DataTexture{constructor(e=512,t=512){super(new Float32Array(e*t*4),e,t,r.RGBAFormat,r.FloatType,r.EquirectangularReflectionMapping,r.RepeatWrapping,r.ClampToEdgeWrapping,r.LinearFilter,r.LinearFilter),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;let{data:e,width:t,height:r}=this.image;for(let s=0;s<t;s++)for(let l=0;l<r;l++){n.set(t,r),a.set(s/t,l/r),a.x-=.5,a.y=1-a.y,o.theta=2*a.x*Math.PI,o.phi=a.y*Math.PI,o.radius=1,this.generationCallback(o,a,n,i);let c=4*(l*t+s);e[c+0]=i.r,e[c+1]=i.g,e[c+2]=i.b,e[c+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}}}),p("5rCKZ",function(e,t){l(e.exports,"ClampedInterpolationMaterial",()=>a);var r=h("ilwiq");class a extends r.ShaderMaterial{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}}}),p("891vQ",function(e,t){l(e.exports,"RGBELoader",()=>a);var r=h("ilwiq");class a extends r.DataTextureLoader{constructor(e){super(e),this.type=r.HalfFloatType}parse(e){let t,a,n;let o=function(e,t){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(t||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(t||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(t||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(t||""))}},i=function(e,t,r){t=t||1024;let a=e.pos,n=-1,o=0,i="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));for(;0>(n=s.indexOf("\n"))&&o<t&&a<e.byteLength;)i+=s,o+=s.length,a+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));return -1<n&&(!1!==r&&(e.pos+=o+n+1),i+s.slice(0,n))},s=new Uint8Array(e);s.pos=0;let l=function(e){let t,r;let a=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,n=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};for(!(e.pos>=e.byteLength)&&(t=i(e))||o(1,"no header found"),(r=t.match(/^#\?(\S+)/))||o(3,"bad initial token"),c.valid|=1,c.programtype=r[1],c.string+=t+"\n";!1!==(t=i(e));){if(c.string+=t+"\n","#"===t.charAt(0)){c.comments+=t+"\n";continue}if((r=t.match(a))&&(c.gamma=parseFloat(r[1])),(r=t.match(n))&&(c.exposure=parseFloat(r[1])),(r=t.match(s))&&(c.valid|=2,c.format=r[1]),(r=t.match(l))&&(c.valid|=4,c.height=parseInt(r[1],10),c.width=parseInt(r[2],10)),2&c.valid&&4&c.valid)break}return 2&c.valid||o(3,"missing format specifier"),4&c.valid||o(3,"missing image size specifier"),c}(s),c=l.width,d=l.height,u=function(e,t,r){if(t<8||t>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);t!==(e[2]<<8|e[3])&&o(3,"wrong scanline width");let a=new Uint8Array(4*t*r);a.length||o(4,"unable to allocate buffer space");let n=0,i=0,s=4*t,l=new Uint8Array(4),c=new Uint8Array(s),d=r;for(;d>0&&i<e.byteLength;){i+4>e.byteLength&&o(1),l[0]=e[i++],l[1]=e[i++],l[2]=e[i++],l[3]=e[i++],(2!=l[0]||2!=l[1]||(l[2]<<8|l[3])!=t)&&o(3,"bad rgbe scanline format");let r=0,u;for(;r<s&&i<e.byteLength;){let t=(u=e[i++])>128;if(t&&(u-=128),(0===u||r+u>s)&&o(3,"bad scanline data"),t){let t=e[i++];for(let e=0;e<u;e++)c[r++]=t}else c.set(e.subarray(i,i+u),r),r+=u,i+=u}for(let e=0;e<t;e++){let r=0;a[n]=c[e+r],r+=t,a[n+1]=c[e+r],r+=t,a[n+2]=c[e+r],r+=t,a[n+3]=c[e+r],n+=4}d--}return a}(s.subarray(s.pos),c,d);switch(this.type){case r.FloatType:let h=new Float32Array(4*(n=u.length/4));for(let e=0;e<n;e++)!function(e,t,r,a){let n=Math.pow(2,e[t+3]-128)/255;r[a+0]=e[t+0]*n,r[a+1]=e[t+1]*n,r[a+2]=e[t+2]*n,r[a+3]=1}(u,4*e,h,4*e);t=h,a=r.FloatType;break;case r.HalfFloatType:let p=new Uint16Array(4*(n=u.length/4));for(let e=0;e<n;e++)!function(e,t,a,n){let o=Math.pow(2,e[t+3]-128)/255;a[n+0]=(0,r.DataUtils).toHalfFloat(Math.min(e[t+0]*o,65504)),a[n+1]=(0,r.DataUtils).toHalfFloat(Math.min(e[t+1]*o,65504)),a[n+2]=(0,r.DataUtils).toHalfFloat(Math.min(e[t+2]*o,65504)),a[n+3]=(0,r.DataUtils).toHalfFloat(1)}(u,4*e,p,4*e);t=p,a=r.HalfFloatType;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:c,height:d,data:t,header:l.string,gamma:l.gamma,exposure:l.exposure,type:a}}setDataType(e){return this.type=e,this}load(e,t,a,n){return super.load(e,function(e,a){switch(e.type){case r.FloatType:case r.HalfFloatType:e.colorSpace=r.LinearSRGBColorSpace,e.minFilter=r.LinearFilter,e.magFilter=r.LinearFilter,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,a)},a,n)}}}),p("cE5k3",function(e,t){l(e.exports,"getScaledSettings",()=>r);function r(){let e=3,t=Math.max(1/window.devicePixelRatio,.5);return window.innerWidth/window.innerHeight<.65&&(e=4,t=.5/window.devicePixelRatio),{tiles:e,renderScale:t}}}),p("e2Pv4",function(e,t){let r;l(e.exports,"LoaderElement",()=>a);class a{constructor(){r||((r=document.createElement("style")).textContent=`

		.loader-container, .description {
			position: absolute;
			width: 100%;
			font-family: 'Courier New', Courier, monospace;
			color: white;
			font-weight: light;
			align-items: flex-start;
			font-size: 14px;
			pointer-events: none;
			user-select: none;
		}

		.loader-container {
			display: flex;
			flex-direction: column;
			bottom: 0;
		}

		.description {
			top: 0;
			width: 100%;
			text-align: center;
			padding: 5px 0;
		}

		.loader-container .bar {
			height: 2px;
			background: white;
			width: 100%;
		}

		.loader-container .credits,
		.loader-container .samples,
		.loader-container .percentage {
			padding: 5px;
			margin: 0 0 1px 1px;
			background: rgba( 0, 0, 0, 0.2 );
			border-radius: 2px;
			display: inline-block;
		}

		.loader-container:not(.loading) .bar,
		.loader-container:not(.loading) .percentage,
		.loader-container.loading .credits,
		.loader-container.loading .samples,
		.loader-container .credits:empty {
			display: none;
		}

		.loader-container .credits a,
		.loader-container .credits,
		.loader-container .samples {
			color: rgba( 255, 255, 255, 0.75 );
		}
	`,document.head.appendChild(r));let e=document.createElement("div");e.classList.add("loader-container");let t=document.createElement("div");t.classList.add("percentage"),e.appendChild(t);let a=document.createElement("div");a.classList.add("samples"),e.appendChild(a);let n=document.createElement("div");n.classList.add("credits"),e.appendChild(n);let o=document.createElement("div");o.classList.add("bar"),e.appendChild(o);let i=document.createElement("div");i.classList.add("description"),e.appendChild(i),this._description=i,this._loaderBar=o,this._percentage=t,this._credits=n,this._samples=a,this._container=e,this.setPercentage(0)}attach(e){e.appendChild(this._container),e.appendChild(this._description)}setPercentage(e){this._loaderBar.style.width=`${100*e}%`,0===e?this._percentage.innerText="Loading...":this._percentage.innerText=`${(100*e).toFixed(0)}%`,e>=1?this._container.classList.remove("loading"):this._container.classList.add("loading")}setSamples(e){this._samples.innerText=`${Math.floor(e)} samples`}setCredits(e){this._credits.innerHTML=e}setDescription(e){this._description.innerHTML=e}}}),p("kqOCM",function(e,t){l(e.exports,"ParallelMeshBVHWorker",()=>u);var r=h("ilwiq"),a=h("6KVZ3"),n=h("3ePKg"),o=h("cSOJe"),i=h("a8VBx"),s=h("5Gkg5");let c="undefined"!=typeof navigator?navigator.hardwareConcurrency:4;class d extends n.WorkerBase{constructor(){if(super(new Worker(h("2tQrc"))),this.name="ParallelMeshBVHWorker",this.maxWorkerCount=Math.max(c,4),!(0,o.isSharedArrayBufferSupported)())throw Error("ParallelMeshBVHWorker: Shared Array Buffers are not supported.")}runTask(e,t,n={}){return new Promise((i,l)=>{if(t.index||n.indirect||(0,s.ensureIndex)(t,n),t.getAttribute("position").isInterleavedBufferAttribute||t.index&&t.index.isInterleavedBufferAttribute)throw Error("ParallelMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");e.onerror=e=>{l(Error(`ParallelMeshBVHWorker: ${e.message}`))},e.onmessage=o=>{let{data:s}=o;if(s.error)l(Error(s.error)),e.onmessage=null;else if(s.serialized){let{serialized:o,position:l}=s,c=(0,a.MeshBVH).deserialize(o,t,{setIndex:!1}),d={setBoundingBox:!0,...n};if(t.attributes.position.array=l,o.index){if(t.index)t.index.array=o.index;else{let e=new r.BufferAttribute(o.index,1,!1);t.setIndex(e)}}d.setBoundingBox&&(t.boundingBox=c.getBoundingBox(new r.Box3)),n.onProgress&&n.onProgress(s.progress),i(c),e.onmessage=null}else n.onProgress&&n.onProgress(s.progress)};let c=t.index?t.index.array:null,d=t.attributes.position.array;e.postMessage({operation:"BUILD_BVH",maxWorkerCount:this.maxWorkerCount,index:(0,o.convertToBufferType)(c,SharedArrayBuffer),position:(0,o.convertToBufferType)(d,SharedArrayBuffer),options:{...n,onProgress:null,includedProgressCallback:!!n.onProgress,groups:[...t.groups]}})})}}class u{constructor(){if((0,o.isSharedArrayBufferSupported)())return new d;{console.warn("ParallelMeshBVHWorker: SharedArrayBuffers not supported. Falling back to single-threaded GenerateMeshBVHWorker.");let e=new i.GenerateMeshBVHWorker;return e.maxWorkerCount=c,e}}}}),p("3ePKg",function(e,t){l(e.exports,"WorkerBase",()=>r);class r{constructor(e){this.name="WorkerBase",this.running=!1,this.worker=e,this.worker.onerror=e=>{if(e.message)throw Error(`${this.name}: Could not create Web Worker with error "${e.message}"`);throw Error(`${this.name}: Could not create Web Worker.`)}}runTask(){}generate(...e){if(this.running)throw Error("GenerateMeshBVHWorker: Already running job.");if(null===this.worker)throw Error("GenerateMeshBVHWorker: Worker has been disposed.");this.running=!0;let t=this.runTask(this.worker,...e);return t.finally(()=>{this.running=!1}),t}dispose(){this.worker.terminate(),this.worker=null}}}),p("a8VBx",function(e,t){l(e.exports,"GenerateMeshBVHWorker",()=>o);var r=h("ilwiq"),a=h("6KVZ3"),n=h("3ePKg");class o extends n.WorkerBase{constructor(){super(new Worker(h("jVRlM"))),this.name="GenerateMeshBVHWorker"}runTask(e,t,n={}){return new Promise((o,i)=>{if(t.getAttribute("position").isInterleavedBufferAttribute||t.index&&t.index.isInterleavedBufferAttribute)throw Error("GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");e.onerror=e=>{i(Error(`GenerateMeshBVHWorker: ${e.message}`))},e.onmessage=s=>{let{data:l}=s;if(l.error)i(Error(l.error)),e.onmessage=null;else if(l.serialized){let{serialized:i,position:s}=l,c=(0,a.MeshBVH).deserialize(i,t,{setIndex:!1}),d=Object.assign({setBoundingBox:!0},n);if(t.attributes.position.array=s,i.index){if(t.index)t.index.array=i.index;else{let e=new r.BufferAttribute(i.index,1,!1);t.setIndex(e)}}d.setBoundingBox&&(t.boundingBox=c.getBoundingBox(new r.Box3)),n.onProgress&&n.onProgress(l.progress),o(c),e.onmessage=null}else n.onProgress&&n.onProgress(l.progress)};let s=t.index?t.index.array:null,l=t.attributes.position.array,c=[l];s&&c.push(s),e.postMessage({index:s,position:l,options:{...n,onProgress:null,includedProgressCallback:!!n.onProgress,groups:[...t.groups]}},c.map(e=>e.buffer).filter(e=>"undefined"==typeof SharedArrayBuffer||!(e instanceof SharedArrayBuffer)))})}}}),p("jVRlM",function(e,t){var r=h("7ryUf");let a=new URL("generateMeshBVH.worker.373f3c58.js",import.meta.url);e.exports=r(a.toString(),a.origin,!0)}),p("7ryUf",function(e,t){e.exports=function(e,t,r){if(t===self.location.origin)return e;var a=r?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([a],{type:"application/javascript"}))}}),p("2tQrc",function(e,t){var r=h("7ryUf");let a=new URL("parallelMeshBVH.worker.22cf4bb0.js",import.meta.url);e.exports=r(a.toString(),a.origin,!0)}),p("9fZ6X",function(e,t){l(e.exports,"MaterialBase",()=>a);var r=h("ilwiq");class a extends r.ShaderMaterial{constructor(e){for(let t in super(e),this.uniforms)Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(e){this.uniforms[t].value=e}})}setDefine(e,t){if(null==t){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}}}),p("fYvb1",function(e,t){l(e.exports,"math_functions",()=>r);let r=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`}),p("dUUQZ",function(e,t){l(e.exports,"util_functions",()=>r);let r=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`}),p("8keuf",function(e,t){l(e.exports,"ggx_functions",()=>r);let r=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`}),h("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["bmGh7","spotLights.9590d5be.js","512E4","parallelMeshBVH.worker.22cf4bb0.js","9P1cE","generateMeshBVH.worker.cd4b9fc6.js","lWWke","generateMeshBVH.worker.373f3c58.js","9P1cE","generateMeshBVH.worker.cd4b9fc6.js","jwbL2","aoRender.e5303912.js","63CMm","aoRender.a1271ff5.js","2tzBs","aoRender.89c1b67b.js","6UuCC","aoRender.5fc59dbe.js","6mMEU","aoRender.fc8349f1.js","j19h5","aoRender.e8b1599c.js","eif6c","areaLight.5654e8b2.js"]'));var m=h("ilwiq"),g=h("7lx9d"),f=h("5Rd1x"),m=h("ilwiq"),b=h("2vGrm");function v(e){let t;let r=this,a=e.split("\n"),n=0;function o(e){return(e=(e=(e=e.trim()).replace(/,/g," ")).replace(/\s\s+/g," ")).split(" ")}function i(e,t){for(;;){let r=o(a[n++]);for(let e=0;e<r.length;++e)t.push(Number(r[e]));if(t.length===e)break}}for(r.verAngles=[],r.horAngles=[],r.candelaValues=[],r.tiltData={},r.tiltData.angles=[],r.tiltData.mulFactors=[];!(t=a[n++]).includes("TILT"););if(!t.includes("NONE")&&t.includes("INCLUDE")){let e;e=o(a[n++]),r.tiltData.lampToLumGeometry=Number(e[0]),e=o(a[n++]),r.tiltData.numAngles=Number(e[0]),i(r.tiltData.numAngles,r.tiltData.angles),i(r.tiltData.numAngles,r.tiltData.mulFactors)}!function(){let e=[];i(10,e),r.count=Number(e[0]),r.lumens=Number(e[1]),r.multiplier=Number(e[2]),r.numVerAngles=Number(e[3]),r.numHorAngles=Number(e[4]),r.gonioType=Number(e[5]),r.units=Number(e[6]),r.width=Number(e[7]),r.length=Number(e[8]),r.height=Number(e[9])}(),function(){let e=[];i(3,e),r.ballFactor=Number(e[0]),r.blpFactor=Number(e[1]),r.inputWatts=Number(e[2])}();for(let e=0;e<r.numHorAngles;++e)r.candelaValues.push([]);i(r.numVerAngles,r.verAngles),i(r.numHorAngles,r.horAngles);for(let e=0;e<r.numHorAngles;++e)i(r.numVerAngles,r.candelaValues[e]);for(let e=0;e<r.numHorAngles;++e)for(let t=0;t<r.numVerAngles;++t)r.candelaValues[e][t]*=r.candelaValues[e][t]*r.multiplier*r.ballFactor*r.blpFactor;let s=-1;for(let e=0;e<r.numHorAngles;++e)for(let t=0;t<r.numVerAngles;++t){let a=r.candelaValues[e][t];s=s<a?a:s}if(s>0)for(let e=0;e<r.numHorAngles;++e)for(let t=0;t<r.numVerAngles;++t)r.candelaValues[e][t]/=s}class x extends m.Loader{_getIESValues(e){let t=new Float32Array(64800),r=e.horAngles[0],a=e.horAngles[e.numHorAngles-1];for(let n=0;n<64800;++n){let o=n%360,i=Math.floor(n/360);a-r!=0&&(o<r||o>=a)&&(o%=2*a)>a&&(o=2*a-o),t[n]=function(t,r){let a=0,n=0,o=0,i=0,s=0,l=0;for(let t=0;t<e.numHorAngles-1;++t)if(r<e.horAngles[t+1]||t==e.numHorAngles-2){n=t,o=e.horAngles[t],i=e.horAngles[t+1];break}for(let r=0;r<e.numVerAngles-1;++r)if(t<e.verAngles[r+1]||r==e.numVerAngles-2){a=r,s=e.verAngles[r],l=e.verAngles[r+1];break}let c=i-o,d=l-s;if(0===d)return 0;let u=0===c?0:(r-o)/c,h=(t-s)/d,p=0===c?n:n+1,g=(0,m.MathUtils).lerp(e.candelaValues[n][a],e.candelaValues[p][a],u),f=(0,m.MathUtils).lerp(e.candelaValues[n][a+1],e.candelaValues[p][a+1],u);return(0,m.MathUtils).lerp(g,f,h)}(i,o)}return t}load(e,t,r,a){let n=new m.FileLoader(this.manager);n.setResponseType("text"),n.setCrossOrigin(this.crossOrigin),n.setWithCredentials(this.withCredentials),n.setPath(this.path),n.setRequestHeader(this.requestHeader);let o=new m.DataTexture(null,360,180,m.RedFormat,m.HalfFloatType);return o.minFilter=m.LinearFilter,o.magFilter=m.LinearFilter,n.load(e,e=>{let r=new v(e);o.image.data=(0,b.toHalfFloatArray)(this._getIESValues(r)),o.needsUpdate=!0,void 0!==t&&t(o)},r,a),o}parse(e){let t=new v(e),r=new m.DataTexture(null,360,180,m.RedFormat,m.HalfFloatType);return r.minFilter=m.LinearFilter,r.magFilter=m.LinearFilter,r.image.data=(0,b.toHalfFloatArray)(this._getIESValues(t)),r.needsUpdate=!0,r}}var w=h("d4kES"),y=h("8mHfG"),T=h("891vQ"),S=h("jiuw3"),k=h("cE5k3"),C=h("e2Pv4"),P=h("kqOCM");const _=["https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/0646706b3d2d9658994fc4ad80681dec.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/06b4cfdc8805709e767b5e2e904be8ad.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/007cfb11e343e2f42e3b476be4ab684e.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/01dac7d6c646814dcda6780e7b7b4566.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/108b32f07d6d38a7a6528a6d307440df.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/1aec5958092c236d005093ca27ebe378.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/02a7562c650498ebb301153dbbf59207.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/1a936937a49c63374e6d4fbed9252b29.ies","https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/ies/00c6ce79e1d2cdf3a1fb491aaaa47ae0.ies"],F={multipleImportanceSampling:!0,bounces:3,renderScale:1/window.devicePixelRatio,tiles:2,iesProfile:-1,...(0,k.getScaledSettings)()};function B(){t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio*F.renderScale),n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),e.updateCamera()}function M(){e.multipleImportanceSampling=F.multipleImportanceSampling,e.bounces=F.bounces,e.updateLights()}!async function(){(s=new C.LoaderElement).attach(document.body),(t=new m.WebGLRenderer).shadowMap.enabled=!0,t.physicallyCorrectLights=!0,t.shadowMap.type=m.PCFSoftShadowMap,t.toneMapping=m.ACESFilmicToneMapping,document.body.appendChild(t.domElement),(e=new y.WebGLPathTracer(t)).setBVHWorker(new P.ParallelMeshBVHWorker),e.tiles.set(F.tiles,F.tiles),e.textureSize.set(2048,2048),e.filterGlossyFactor=.5;let l=window.innerWidth/window.innerHeight;(n=new m.PerspectiveCamera(75,l,.025,500)).position.set(-2,4,8).multiplyScalar(.8),(r=new f.OrbitControls(n,t.domElement)).target.y=1.5,r.update(),r.addEventListener("change",()=>e.updateCamera()),(a=new m.Scene).backgroundBlurriness=.1,a.environmentIntensity=.1,a.backgroundIntensity=.1;let c=new x,[d,u,h]=await Promise.all([new(0,T.RGBELoader)().loadAsync("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr"),new(0,g.GLTFLoader)().loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/steampunk-robot/scene.gltf"),Promise.all(_.map(e=>c.loadAsync(e)))]);i=h,d.mapping=m.EquirectangularReflectionMapping,a.environment=d,a.background=d,u.scene.scale.setScalar(1),u.scene.updateMatrixWorld(),u.scene.traverse(e=>{e.castShadow=!0,e.receiveShadow=!0}),a.add(u.scene);let p=new m.Box3;p.setFromObject(u.scene);let b=new m.Mesh(new m.CylinderGeometry(8,8,.5,200),new m.MeshStandardMaterial({color:5592405,roughness:.05,metalness:.4}));b.geometry=b.geometry.toNonIndexed(),b.geometry.clearGroups(),b.position.y=p.min.y-.25,b.receiveShadow=!0,b.material.color.convertSRGBToLinear(),a.add(b);let v=new m.Mesh(new m.BoxGeometry(14,6,.5),new m.MeshStandardMaterial({color:10511460,roughness:.4,metalness:.1}));v.castShadow=!0,v.receiveShadow=!0,v.geometry=v.geometry.toNonIndexed(),v.geometry.clearGroups(),v.position.x=0,v.position.y=p.min.y+3,v.position.z=p.min.z-.5,v.material.color.convertSRGBToLinear(),a.add(v),(o=new w.PhysicalSpotLight(16777215)).position.set(0,7,4),o.angle=Math.PI/4.5,o.decay=0,o.penumbra=1,o.distance=0,o.intensity=50,o.radius=.5,o.shadow.mapSize.width=512,o.shadow.mapSize.height=512,o.shadow.camera.near=.1,o.shadow.camera.far=10,o.shadow.focus=1,o.castShadow=!0,a.add(o);let k=o.target;k.position.x=0,k.position.y=b.position.y+2,k.position.z=.05,a.add(k),await e.setSceneAsync(a,n,{onProgress:e=>s.setPercentage(e)}),s.setCredits("Model by Benedict Chew on Sketchfab"),M(),B(),window.addEventListener("resize",B);let A=new S.GUI,E=A.addFolder("Path Tracing");E.add(F,"multipleImportanceSampling").onChange(M),E.add(F,"tiles",1,4,1).onChange(t=>{e.tiles.set(t,t)}),E.add(F,"bounces",1,30,1).onChange(M),E.add(F,"renderScale",.1,1).onChange(B);let R=A.addFolder("Spot Light");R.addColor(o,"color").onChange(M),R.add(o,"intensity",0,200,.01).onChange(M),R.add(o,"radius",0,10).onChange(M),R.add(o,"decay",0,2).onChange(M),R.add(o,"distance",0,20).onChange(M),R.add(o,"angle",0,Math.PI/2).onChange(M),R.add(o,"penumbra",0,1).onChange(M),R.add(F,"iesProfile",-1,_.length-1,1).onChange(e=>{o.iesTexture=-1===e?null:i[e],M()}),function t(){requestAnimationFrame(t),n.updateMatrixWorld(),e.renderSample(),s.setSamples(e.samples)}()}();
//# sourceMappingURL=spotLights.9590d5be.js.map
