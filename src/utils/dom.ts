/**
 * Offset Left
 * getBoundingClientRect technique from
 * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
 *
**/

 export function findElPosition(el: any) {
    let box: { left: number, top: number } = {
        left: 0,
        top: 0
    };
  
    if (el.getBoundingClientRect && el.parentNode) {
      box = el.getBoundingClientRect();
    }
  
    if (!box) {
      return box;
    }
  
    const { body, documentElement: docEl } = document;
  
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const scrollLeft = window.pageXOffset || body.scrollLeft;
    const left = box.left + scrollLeft - clientLeft;
  
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const scrollTop = window.pageYOffset || body.scrollTop;
    const top = box.top + scrollTop - clientTop;
  
    // Android sometimes returns slightly off decimal values, so need to round
    return {
      left: Math.round(left),
      top: Math.round(top)
    };
}

export function getPointerPosition(el: any, event: any) {
    const position: {
        y: number,
        x: number
    } = {
        y: 0,
        x: 0
    };
    const box = findElPosition(el);

    const boxW = el.offsetWidth;
    const boxH = el.offsetHeight;
  
    const boxY = box.top;
    const boxX = box.left;
    let evtPageY = event.pageY;
    let evtPageX = event.pageX;
  
    if (event.changedTouches) {
      evtPageX = event.changedTouches[0].pageX;
      evtPageY = event.changedTouches[0].pageY;
    }
  
    position.y = Math.max(0, Math.min(1, (boxY - evtPageY + boxH) / boxH));
    position.x = Math.max(0, Math.min(1, (evtPageX - boxX) / boxW));
  
    return position;
}