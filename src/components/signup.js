// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// const SignupPage = () => {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     console.log("handleSignup called");
//     try {
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstname,
//           lastname,
//           phone,
//           password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to sign up");
//       }

//       console.log("Signup successful");

//       // After successful signup, navigate to the dashboard
//       window.location.href = "/dashboard";
//     } catch (error) {
//       console.error("Error signing up:", error);
//     }
//   };

//   return (
//     <div id="mainpanel">
//       <h2>SIGNUP</h2>
//       <form method="GET" action="/dashboard">
//         <InputText
//           value={firstname}
//           onChange={(e) => setFirstname(e.target.value)}
//           placeholder="Firstname"
//           type="text"
//           className="input-field"
//         />
//         <InputText
//           value={lastname}
//           onChange={(e) => setLastname(e.target.value)}
//           placeholder="Lastname"
//           type="text"
//           className="input-field"
//         />
//         <InputText
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Phone No."
//           type="text"
//           className="input-field"
//         />
//         <InputText
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           type="password"
//           className="input-field"
//         />
//         <div id="buttonpanel">
//           <Button label="Signup" onClick={handleSignup} />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;



import React, { useState } from "react";

const SignupPage = () => {

  const labels = document.querySelectorAll('.form-control label')

  labels.forEach(label => {
      label.innerHTML = label.innerText
          .split('')
          .map((letter, index) => `<span style="transition-delay:${index * 40}ms">${letter}</span>`)
          .join('')
  })

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("handleSignup called");
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      console.log("Signup successful");

      // After successful signup, navigate to the dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div id="mainpanel">
      <h1>Quest<span style={{color: "darkorange", marginLeft: "7px"}}>Masters</span></h1>
      <div class="form_container">
        <h1>Signup</h1>
        <form method="GET" action="/dashboard">
            <div class="form-control">
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" required name="firstname"/>
                <label>Firstname</label>
            </div>
            <div class="form-control">
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" required name="lastname"/>
                <label>Lastname</label>
            </div>
            <div class="form-control">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" required name="phone"/>
                <label>Phone</label>
            </div>
            <div class="form-control">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required name="password"/>
                <label>Password</label>
            </div>
            <button class="btn" type='submit' onClick={handleSignup}>Signup</button>
            <p class="text">Already have an account? <a href="login">Login</a></p>
        </form>
      </div>

    </div>
  );
};

export default SignupPage;
