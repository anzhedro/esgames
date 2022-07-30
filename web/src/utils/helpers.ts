export function randomInteger(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// return a promise
export function copyToClipboard(str: string): Promise<void> {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(str);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = str;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
}
