import toast from 'react-hot-toast';

// username validation
function nameVerify(error = {}, values) {
    if (!values.name) {
        error.name = toast.warning('Name required');
    } else if (values.name.trim() === '') {
        error.name = toast.error('Name required');
    } else if (values.name.trim().length < 3) {
        error.name = toast.error('Name too short');
    }
    return error;
}
export async function validateName(values) {
    const errors = nameVerify({}, values);
    return errors;
}

// validate email
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.warning('Email required');
    } else if (values.email.trim() === '') {
        error.email = toast.error('Email required');
    }
    return error;
}
export async function validateEmail(values) {
    const errors = emailVerify({}, values);
    return errors;
}

// validate password
function passwordVerify(error = {}, values) {
    if (!values.email) {
        error.password = toast.warning('Password required');
    } else if (values.password.trim() === '') {
        error.password = toast.error('Password required');
    } else if (values.password.trim().length < 6) {
        error.password = toast.error(
            'Password must be more than 5 characters.'
        );
    }
    return error;
}
export async function validatePassword(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

// register validation
export async function validateRegister(values) {
    const errors = nameVerify({}, values);
    emailVerify(errors, values);
    passwordVerify(errors, values);
    return errors;
}
