// next auth setup steps
/**
 1) src->app->api->auth->[...nextauth]->route.js
 2) inside route.js export auth option this defines which provider uses for login like credential or google...
 basic structure
 
 import NextAuth from "next-auth";

 export const authOptions = {

 };
 const handler = NextAuth(authOptions);
 export {handler as GET, handler as POST};


3) auth options is a opject that have multiple properties
providers , pages, sesssion,callbacks, cookies, secret

 
 */


/**
 * creadential provider is a array that can take multiple provider
 // steps of creadential provider
 1)  name : "Credentials", credentials:{},
 async authorize(credentials){
 }
 */



 /**
  * steps to create auth context
  import { createContext, useContext }  from "react";
 
 
  const AuthContext = createContext(null);
  const useAuth = ()=>{
     const context = useContext(AuthContext);
     if(!context){
         throw new Error ("User must be inside the context")
     }
     return context;
  }
  export const AuthProvider = ({children})=>{
     const value ={
 
     }
     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
 
  }
  */
 