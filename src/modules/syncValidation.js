// sync validation
const syncV = values => {
    const errors = {};
    console.log("Validation:", values)
    /*if(!values.domainId){
        errors.login = 'Поле обязательно для заполнения!';
    }

    if(!values.roleId){
        errors.login = 'Поле обязательно для заполнения!';
    }*/

    if(!values.FirstName){
        errors.FirstName = 'Поле обязательно для заполнения!';
    } else if (values.FirstName.length > 15) {
        errors.FirstName = 'Текст должен быть менее 15 символов!'
    }

    if(!values.LastName){
        errors.LastName = 'Поле обязательно для заполнения!';
    } else if (values.LastName.length > 15) {
        errors.LastName = 'Текст должен быть менее 15 символов!'
    }

    if(!values.email){
        errors.email = 'Поле обязательно для заполнения!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    	// if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(values.email))
     /*&&  checkMailUnquie(values.email)*/) {
        errors.email = 'Не коректный email!'
    }

    if(!values.login){
        errors.login = 'Поле обязательно для заполнения!';
    }

    if(!values.password){
        errors.password = 'Поле обязательно для заполнения!';
    } else if (values.password.length < 8) {
        errors.password = 'Пароль должен быть не менее 8 символов!'
    }

    return errors
};


export default syncV;