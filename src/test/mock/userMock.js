exports.token = {
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA1NDQzOTY1LCJleHAiOjE2MDYwNDg3NjV9.n4eE5s_P6s8DcX2J0uN5nebmGKNy0lxpaBI-IS_as_U",
    operator: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11Z2VtYWxlb0BnbWFpbC5jb20iLCJyb2xlIjoib3BlcmF0b3IiLCJpYXQiOjE2MDU0NDQwNzQsImV4cCI6MTYwNjA0ODg3NH0.homHXMJBZr2N5iNWb3Ig2PnJNE9oYheff_fxKELm3hM",
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11Z2VtYWxlb0BnbWFpbC5jb20iLCJyb2xlIjoib3BlcmF0b3IiLCJpYXQiOjE2MDU0NDQwNzQsImV4cCI6MTYwNjA0ODg3NH0.homHXMJBZr2N5iNWb3Ig2PnJNE9oYheff_fxKEL`
}
exports.NotExistEmail = {
    email: "kamali@gmail.com",
    role: "operator"
}
exports.isNotInSystem = {
    email: "kamali@gmail.com",
    password:"password",
    confirmPassword:"password"
}
exports.InvalidEmail = {
    email: "kamaligmail.com"
}
exports.requiredRole = {
    email: "mugemaleo@gmail.com"
}

exports.roleNotIncluded = {
    email: "mugemaleo@gmail.com",
    role: "dancer"
}

exports.rightInput = {
    email: "mugemaleo@gmail.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "dancer"
}

exports.rightEmail ={
    email: "mugemaleo@gmail.com"
}

exports.invalidPassword ={
    password: "kiki"
}
exports.shortPassword ={
    email:"mugemaleo@gmail.com",
    password: "ki"
}
exports.validPasswords ={
    password: "password",
    confirmPassword: "password"
}
exports.unMatchedPasswords ={
    password: "password",
    confirmPassword: "passwordkiki"
}
exports.confirmPassword ={
    confirmPassword: "password"
}
exports.emptyconfirmPassword ={
    password:"password",
    confirmPassword: ""
}
exports.emptyPassword ={
    email:"mugemaleo2@gmail.com",
    password:""
 }
exports.emptyEmail ={
   email:""
}
 exports.isNotRegistared ={
    email:"andela@yahoo.fr"
 }
 exports.correctInfo = {
    email: "Josh@phantom.com",
    password:"admin"
 }
 exports.inCorrectInfo = {
    email: "mugemale@gmail.com",
    password:"adm123"
 }
