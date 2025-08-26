const blogResponse = {
    created: "Blog created successfully.",
    fetched: "Blogs fetched successfully",
    idRequired: "Please provide valid blog id.",
    notExists: "Blog does not exits for this id",
    updated: "Blog updated successfully.",
    deleted: "Blog deleted successfully."
}

const authResponse = {
    ifFound : "User with this email or phone number already exists",
    notFound: "No user found!! Sorry try with other ones.",
    created: "User created successfully.",
    inValidCredentials: "Invalid, Please try with correct password.",
    loggedIn: "User logged in successfully"

    
}

export { blogResponse, authResponse };