exports.token = {
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzMTIzNzgyLCJleHAiOjE2MDMyMTAxODJ9.2SeCPFQ6YDRPjHgxv5tReVR3QzqQnvxP3D8nWpx4Sv4",
    operator: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNzY4MTI2LCJleHAiOjE2MTA1NDQxMjZ9.dUgTrvRha8iW8qa5o9YjkcVwMx-3gs-l4zwkL7rfD5c",
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNTkyMzU1LCJleHAiOjE2MTAzNjgzNTV9.jaTYL-S7lkBdrsG-_tVYwzVxwjj4ClevfbC14UNdjrw`
}

exports.NotExistEmail = {
    email: "kamali@gmail.com",
    role: "operator"
}

exports.InvalidEmail = {
    email: "kamaligmail.com"
}

exports.requiredRole = {
    email: "Josh@phantom.com"
}

exports.roleNotIncluded = {
    email: "Josh@phantom.com",
    role: "dancer"
}

exports.rightInput = {
    email: "Josh@phantom.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "dancer"
}