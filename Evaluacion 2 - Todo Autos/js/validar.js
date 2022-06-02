document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
});


function validarFormulario() {
    var nombre=document.formulario.nombre.value
    var apellido=document.formulario.apellido.value
    var rut=document.formulario.rut.value
    var telefono=document.formulario.telefono.value
    var email=document.formulario.email.value
    var contraseña=document.formulario.contraseña.value
    //Validaciones
    if(nombre.length<2)
    {
        alert("El Nombre debe contener al menos 3 caracteres como minimo")
        document.formulario.nombre.focus();
        return 0;
    }
    if(apellido.length<2)
    {
        alert("el Apellido debe contener al menos 3 caracteres como minimo")
        document.formulario.apellido.focus();
        return 0;
    }

    

    if(telefono.substring(0,1)!="9" )
    {
        alert("El telefono debe empezar con '9' ")
        document.formulario.telefono.focus();
        return 0;
    }

    if ((email == "") || (contraseña == "")) {
        alert("Los campos no pueden quedar vacios");
        return true;
    }


    //Mensaje
    alert("Se han ingresado los siguientes datos: " + "\n" +
    "Nombre: " + nombre + "\n" + 
    "Apellido: " + apellido + "\n" +
    "Rut: " + rut +"\n" +
    "Telefono: " + telefono + "\n"+
    "Correo Electronico: " + email + "\n"+
    "Contraseña:" + contraseña + "\n")
}


//Validar RUT
function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
    return checkRut
}
//FIN Validar RUT

