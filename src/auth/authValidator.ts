export function validateRegister(data: any){
    if(!data.name||!data.email || !data.password){
        throw new Error("Name, email and password are required");
    }

    if(data.password.length < 6){
        throw new Error("Password must be at least 6 characters");
    }
    
}


export function validateLogin(data: any){
    if(!data.email || !data.password){
        throw new Error("Email and password are required");
        
    }
}