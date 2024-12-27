let ubiPrincipal=window.scrollY

let $nav=document.querySelector("#nav")

window.addEventListener('scroll', function(){
    let ubiActual=window.scrollY
    console.log(ubiActual);

    

    if (ubiPrincipal >= ubiActual) {
        $nav.style.top="0px"
    } else{
        $nav.style.top="-50px";

    }

    ubiPrincipal=ubiActual;
    
    
    
})

// ubiPrincipal:   0    0  se cumple condicion y se oculta nav con top0       50  se sigue cumpliendo condicion    80  no se cumple condicion y se oculta nav con top-100
// ubiActual :     0   50                                                     80                                   40

