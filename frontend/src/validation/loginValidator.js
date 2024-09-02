import { toast } from 'react-toastify';

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

// Login validation
export async function validateLogin(values) {
    const errors = emailVerify({}, values);
    passwordVerify(errors, values);
    return errors;
}
