FP.Hooks.register("beforeChapterDisplay").smartimages = function(callback, chapter){

		var image = chapter.doc.querySelectorAll('img'),
			items = Array.prototype.slice.call(image),
			iheight = chapter.iframe.height,
			oheight;

		items.forEach(function(item){
			
			function size() {
				var height = item.offsetHeight,
					top = item.offsetTop;
				
				iheight = chapter.iframe.height;
				
								
				if(height + top >= iheight) {

					if(top < iheight/2) {
						item.style.maxHeight = iheight - top + "px";
					}else{
						
						item.style.maxHeight = (height < iheight ? height : iheight) + "px";
						item.style.marginTop = iheight - top + "px";
					}
					
				}else{
					item.style.removeProperty('max-height');
					item.style.removeProperty('margin-top');
				}
			}
			
			
			chapter.book.listenUntil("book:resized", "book:chapterDestroy", size);
			
			size();

		});

		if(callback) callback();

}