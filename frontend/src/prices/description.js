const Description = [];
 const interior = {
   	          type:String,
   	          description: "1.Vacuum carpet and mats.\n 2.Spot clean carpet mats and seats.\n 3.Dust and clean dashboard and side panels.\n 4.Clean center console and cup holders.\n 5.Treat and protect dashboard and side panels.\n 6.Clean windows."
            
           }; 
   const exterior = {
   	          type:String,
   	          description: "1.Handwash and chamois dry vehicle.\n 2.Clean tires and rims.\n 3.Remove minor scratches tree sap and tar.\n 4.Hand polish and buff exterior.\n 5.Dress tires.\n 6.Clean windows."
            }; 
    const engine = {    
            type:String,
   	          description: "1.Brush loose dirt and cover electrical connections.\n 2.Degrease engine block and surrounding components.\n 3.Pressure wash engine block.\n 4.Blow dry or drip dry block.\n 5.Add protection and gloss." 
           };
    Description[0] = interior;
    Description[1] = exterior;
    Description[2] = engine;     

 export default Description; 