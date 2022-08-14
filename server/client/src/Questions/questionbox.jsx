import React, { useState,useContext } from 'react';
import { Box } from '@material-ui/core';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import LoginIcon from '@mui/icons-material/Login';
import Alert from '@mui/material/Alert';
import { Url } from '../App';
import { Link } from 'react-router-dom';
import PreviousQue from './PreviousQue';

export default function Questionbox(props) {
  const Profile_image = localStorage.getItem('AlgoViz_avatar');
  const Name = localStorage.getItem('AlgoViz_name');
  const Auth = localStorage.getItem('AlgoViz_token');
  const url = useContext(Url);
  const { pagename } = props;
  const [loading, setLoading] = useState(false);
  const [question, setquestion] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  function handleClick() {
    if (!question) {
      return setError("Please write the Question before ask");
    }
    setLoading(true);
    setError(false)
    // ========================= API Calling for posting Question===================
    const data={
      question:question,
      pagename:pagename
    }
    fetch(url + '/postquestion', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': Auth
      },
      body: JSON.stringify(data)
  }).then((resp) => resp.json())
      .then((res) => {
          if (res.Error) {
              setError(res.Error)
          }
          else {
            setSuccess(res.Message)
            setquestion('');
          }
      }).catch((err) => {
          setError("Something went Wrong, please try again.")
      }).finally(() => {
          setLoading(false);
          new Promise((resolve,reject)=>{
            setTimeout(()=>{
              setSuccess(false);
              setError(false);
              resolve();
            },10000)
          })
      })

  }

  return (
    <>
      <h1>Ask a Question</h1>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Please write your question"
        style={{ width: "80%", borderRadius: "5px" }}
        value={question}
        onChange={(e) => setquestion(e.target.value)}
        required
      />
      <Box sx={{ m: 1 }}>
        <Chip
          avatar={<Avatar alt="Natacha" src={Profile_image} />}
          label={Name}
          variant="outlined"
        />
        {Auth ?
          <LoadingButton sx={{ ml: 1 }} size="small" onClick={handleClick} endIcon={<SendIcon />} loading={loading} loadingPosition="end" variant="contained">
            ASK
          </LoadingButton>
          :
          <Link to='/login'>
            <LoadingButton sx={{ ml: 1 }} size="small" endIcon={<LoginIcon />} loading={loading} loadingPosition="end" variant="contained">
              Please login to Ask
            </LoadingButton>
          </Link>
        }
        {error && <Alert severity="error" >{error}</Alert>}
        {success && <Alert severity="success" >{success}</Alert>}
      </Box>
      <PreviousQue pagename={props.pagename} successpost={success}/>
    </>
  )
}
