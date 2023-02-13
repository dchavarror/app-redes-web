export const END_POINT_SERVICE = {
    USUARIO_VALIDAR: 'usuario/validar',
    GET_PREMIO: 'premio',
    POST_PREMIO_UNITO: 'premio/unico/',
    PUT_PREMIO_ELIMINAR: 'premio/',
    POST_PROMOCION: 'promocion',
    DETALLE_PREMIO: 'detalle-premio/',
    DETALLE_PREMIO_ACTIVO: 'detalle-premio/activo/',
    DETALLE_PREMIO_GUARDAR: 'detalle-premio',
    PERSONA: 'persona',
    GANADOR: 'ganador',
    GANADOR_DETALLE: 'ganador/detalle/validar/',
    PROMOCION_DOCUMENTO: 'promocion/documento/',
    VIGENCIA: 'vigencia/',
    GET_CODIGO_PROMOCION: 'promocion/',
    GET_PROMOCION: 'promocion/promocion/',
    GET_VALIDAR_PROMOCION: 'promocion/validar/',
    GET_ALL_PROMOCIONES: 'promocion/obtener/promociones'
};

export const MESSAGE_SERVICE = {
    DATOS_FALTANTES: 'Por favor validar datos requeridos faltantes',
    NO_EXISTE_VALOR: 'No hay ningun registro asociado a este filtro',
    ACTULIZADO_EXITO: 'Registro actualizado con exito!',
    CREADO_PREMIO_EXITO: 'Premio creado con exito!',
    ELIMINADO_PREMIO_EXITO: 'Premio eliminado con exito',
    PREMIO_ACTIVO_VALIDACION: 'Premio asociado a una promocion, no se puede eliminar!',
    GANADOR_ACTIVO_VALIDACION: 'Ganador asociado a este detalle, no se puede eliminar!',
    SIN_RESPONSE_SERVICE: 'Ocurrio un inconveniente, por verifiquelo con el administrador o intentelo de nuevo',
    SIN_RESPONSE_SERVICE_MESSAGE: 'Ocurrio un inconveniente, por verifiquelo con el administrador',
}

export const TITULOS_MODALES = {
    TITULO_AGREGAR_RED: 'Agregar Red',
    INFORMACION: 'Información'
}

export const MENSAJE_MODALES = {
    POR_FAVOR_VALIDAR_YA_SE_VENCIO_TIEMPO: 'Por favor validar ya se vencio el tiempo de diligenciar datos',
    POR_FAVOR_VALIDAR_DATOS_INCOMPLETOS: 'Por favor validar datos incompletos',
    LINK_COPIADO: 'Link copiado!',
    POR_VALIDAR_EL_FORMATO: 'Por favor ingresa una imagen con uno de los formatos permitidos (Jpg, Png)',
    PESO_VALIDO_IMAGEN: 'Por favor ingrese una imagen con tamaño menor a 1 MB'
}

export const REDES = {
    FACEBOOK: 'FACEBOOK',
    INSTAGRAM: 'INSTAGRAM',
    TIKTOK: 'TIKTOK',
    TWITTER: 'TWITTER'
}
export const TYPE_ICON_SNACKBAR = {
    INFO: 'Info',
    SUCCES: 'Success',
    ERROR: 'Error',
    WARN: 'Warn'
}

export const STATUS_SERVICE = {
    EXITOSO: 200,
    CREACION: 201,
    VENCIDO: 999,
    ACCEPTED: 202,
    RECET_CONTENT: 205
}

export const DOCUMENTO = {
    NOMBRE: 'Reporte.xlsx'
}

export const TERMINOS = {
    TITULO_TERMINOS: 'Terminos',
    CODIGO_TERMINOS: 'CTERMINOS',
    TITULO_TRATAMIENTOS: 'Terminos y condiciones',
    CODIGO_TRATAMIENTOS: 'CTTRATAMIENTO',
    TITULO_CONDICIONES: 'Terminos y condiciones',
    CODIGO_CONDICIONES: 'CCONDICIONES'
}

export const PAGINAS = {
    URL_BETPLAY: "https://betplay.com.co/"
}

export const TABS = {
    CONSULTA: 0,
    ADMINISTRACION: 2,
    PROMOCION: 0,
}

export const ROLES = {
    ROL_ADM: 'ROL_ADM',
    ROL_CONS: 'ROL_CONS'
}

export const TYPE_IMG={
   CADENA_PNG : 'data:image/png;base64,',
   CADENA_JPG : 'data:image/jpj;base64,'
}