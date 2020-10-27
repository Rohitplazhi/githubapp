export const utilities={

    showToast:(toastText,isError)=>{
        var x = document.getElementById('snackbar');
        if(x){
            const className = isError ?'red show':'show';
            x.innerHTML = utilities.replaceAll(toastText,'/n','<br/>');
            x.className = className;
            setTimeout(function (){
                x.className = x.className.replace(className,'');
            },3000);
            }
        },
        replaceAll:(string,find,replaceStr)=>{
            if(!string || string === null){
                return '';
            }
            return string.replace(new RegExp(find,'g'),replaceStr)
        }
} 