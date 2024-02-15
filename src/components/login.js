// import React, { useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import '@mui/material/Dialog';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');

//   const handleLogin = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     console.log('handleLogin called');
//     try {
//         const response = await fetch('http://localhost:5000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username,
//                 password
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to login');
//         }

//         console.log('Login successful');

//         // Get the data from the response
//         const data = await response.json();

//         // Store the phone number (username) in local storage
//         localStorage.setItem('phoneNumber', username);

//         // After successful login, navigate to the dashboard
//         window.location.href = '/dashboard';

//     } catch (error) {
//         console.error('Error logging in:', error);
//         let message = 'Invalid credentials';
//         if (error.message === 'Invalid Username') {
//             message = 'Invalid Username';
//         } else if (error.message === 'Invalid Password') {
//             message = 'Invalid Password';
//         }
//         // Display dialog for wrong username or password
//         setDialogMessage(message);
//         setOpenDialog(true);
//     }
// };


// const handleCloseDialog = () => {
//     setOpenDialog(false);
// };

//   return (
//     <div id='mainpanel'>
//       <h2>LOGIN</h2>
//       <form method='GET' action='dashboard' onSubmit={handleLogin}>
//         <InputText
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Phone No."
//           type="text"
//           className='input-field'
//         />
//         <InputText
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           type="password"
//           className='input-field'
//         />
//         <div id='buttonpanel'>
//           <Button label="Login" type='submit' />
//         </div>
//       </form>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogContent>
//           <div>{dialogMessage}</div>
//           <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LoginPage = () => {

  const labels = document.querySelectorAll('.form-control label')

  labels.forEach(label => {
      label.innerHTML = label.innerText
          .split('')
          .map((letter, index) => `<span style="transition-delay:${index * 40}ms">${letter}</span>`)
          .join('')
  })

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('handleLogin called');
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        console.log('Login successful');

        // Get the data from the response
        const data = await response.json();

        // Store the phone number (username) in local storage
        localStorage.setItem('phoneNumber', username);

        // After successful login, navigate to the dashboard
        window.location.href = '/dashboard';

    } catch (error) {
        console.error('Error logging in:', error);
        let message = 'Invalid credentials';
        if (error.message === 'Invalid Username') {
            message = 'Invalid Username';
        } else if (error.message === 'Invalid Password') {
            message = 'Invalid Password';
        }
        // Display dialog for wrong username or password
        setDialogMessage(message);
        setOpenDialog(true);
    }
};


const handleCloseDialog = () => {
    setOpenDialog(false);
};

  return (
    <div id='mainpanel'>
      <h1>Quest<span style={{color: "darkorange", marginLeft: "7px"}}>Masters</span></h1><br></br>
      <div class="form_container">
        <h1>Login</h1>
        <form method='GET' action='dashboard' onSubmit={handleLogin}>
            <div class="form-control">
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" required name="username"/>
                <label>Username</label>
            </div>
            <div class="form-control">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required name="password"/>
                <label>Password</label>
            </div>
            <button class="btn" type='submit'>Login</button>
            <p class="text">Don't have an account? <a href="signup">Register</a></p>
        </form>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <div>{dialogMessage}</div>
          <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
