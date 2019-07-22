const showValue = () =>{
    let value = document.getElementById('drop-input').value;
    let spanText = document.getElementsByClassName('drop-text')[0];
    
    if(value==""){
        spanText.innerHTML = "Click to Select file or Drag & Drop file here";
        return
    }
    spanText.innerHTML = value;
  
}