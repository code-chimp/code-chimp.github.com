// correctly handle PNG transparency in Win IE 5.5 & 6.
var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);

if ((version >= 5.5) && (document.body.filters)) {
	for(var i=0; i < document.images.length; i++) {
		var img = document.images[i];
		var imgSrc = img.src.toUpperCase();
		
		if (imgSrc.substring(imgSrc.length-3, imgSrc.length) == "PNG") {
			var pNode = img.parentElement;

			if (!(pNode.id) && (img.id)) {pNode.id = img.id}
			if (img.className) {pNode.className += (" " + img.className)}
			if (pNode.nodeName == "A") {pNode.style.cursor = "hand";}
			
			pNode.title = (img.title) ? img.title : img.alt;
			pNode.style.display = "inline-block";
			pNode.style.height = img.height + "px";
			pNode.style.width = img.width + "px";
			pNode.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + img.src + "\', sizingMethod='scale')";
			
			pNode.removeChild(img);
			i = i-1;
		}
	}
}