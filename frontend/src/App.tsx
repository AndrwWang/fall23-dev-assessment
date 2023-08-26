import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Avatar, Rating, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import './App.css';

interface User {
  id: number;
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: string;
  // Other properties...
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [tempNewUserName, setTempNewUserName] = useState(''); 
  const [newAvatar, setNewAvatar] = useState('');
  const [newHeroProject, setNewHeroProject] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [newStatus, setNewStatus] = useState('Active');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddUser = () => {
        // Create a new user object with the input values from the state
      const newUser: User = {
        id: users.length + 1, 
        name: newUserName, 
        avatar: newAvatar, 
        hero_project: newHeroProject,
        notes: newNotes,
        email: newEmail, 
        phone: newPhone, 
        rating: newRating, 
        status: 'Active', 
      };
    
      setNewUserName(newUserName);
      setNewAvatar(newAvatar);
      setNewHeroProject(newHeroProject);
      setNewNotes(newNotes);
      setNewEmail(newEmail);
      setNewPhone(newPhone);
      setNewRating(newRating);
      setNewStatus(newStatus);


      // Add the new user to the existing user list
      setUsers([...users, newUser]);
      handleCloseDialog();
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:5003/api/bog/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  console.log("Render");
  return (
    <div className="App">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h4" gutterBottom>
        HaHa Heroes Volunteers List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add User
      </Button>
      <Grid container spacing={2}>
        {/* Buttons for adding and deleting */}
        <Grid item xs={12}>
  
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth = {true}>

            <DialogTitle>Add New User</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              {/* Add form fields for user properties */}
              <TextField
                label="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Hero Project"
                value={newHeroProject}
                onChange={(e) => setNewHeroProject(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Avatar Link"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                fullWidth
                margin="normal"
              />
               <Rating
                  defaultValue={0}
                  precision={0.5}
                  value = {newRating / 2}
                  onChange={(e, newValue) => setNewRating(newValue! * 2)}
                  
                />
              {/* Add more TextField components for other user properties */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddUser} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
  
        </Grid>
        {users.map((user) => (
          <Grid item xs={10} md={9} lg={8} key={user.id} sx={{ margin: '0 auto' }}>
            <Paper elevation={3} className="user-card">
              <Grid container alignItems="center">
                <Grid item xs={12} md={4} lg={4} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar 
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: 60, height: 60}}
                  />
                  <Typography variant="h6">{user.name}</Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={4} sx={{justifyContent: 'center', alignItems: 'center' }}>
                  
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.email} <br />
                    Number: {user.phone} <br />
                    Project: {user.hero_project}
                  </Typography>
                  </Grid>
          
                  <Grid item xs={12} md={4} lg={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                    <Rating
                  defaultValue={user.rating / 2}
                  precision={0.5}
                  readOnly
                  />
          
                  </Grid>
                  <Grid item xs={12} md={1} lg={2} sx={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    {user.status ? "Active" : "Inactive"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </Grid>
    </div>
  );
}

export default App;
