import React, { useEffect, useState,useContext } from 'react';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Url } from '../App';
export default function PreviousQue(props) {
    const Auth = localStorage.getItem('AlgoViz_token');
    const url = useContext(Url);
    const { pagename } = props;
    // const Name=localStorage.getItem('AlgoViz_name');
    const [loading, setLoading] = useState(false);
    const [QuestionList,setQuestion]=useState([]);
    const [error, setError] = useState(false);
    const handlereply = () => {
        setLoading(true)
    }
    // ============================ API Calling for Getting all Previous questions=================== 
    useEffect(() => {
        let data = {
            pagename: pagename
        }
        fetch(url + '/allquestion', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json())
            .then((res) => {
                if (res.Error) {
                    setError(res.Error)
                }
                else {
                    setQuestion(res.data)
                }
            }).catch((err) => {
                setError("Something went Wrong, please try again.")
            })
            
    },[])
    return (
        <>
            <h3>Previous Questions</h3>
            {error && <Alert severity="error" >{error}</Alert>}
            {QuestionList.map((item)=>(
                <Box sx={{ border: '1px solid grey', p: 1, borderRadius: "10px",m:1 }}>
                <Chip
                    avatar={<Avatar src="/broken-image.jpg" />}
                    label={item.name}
                    variant="outlined"
                />
                <div className="previousque">
                    <p>{item.question}</p>
                </div>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={1}
                    placeholder="Please write your Answer"
                    style={{ width: "80%", borderRadius: "5px" }}
                />
                <Box sx={{ m: 1 }}>
                    {Auth ?
                        <LoadingButton
                            sx={{ ml: 1 }}
                            size="small"
                            color="success"
                            onClick={handlereply}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            REPLY
                        </LoadingButton>
                        :
                        <Link to='/login'>
                            <LoadingButton sx={{ ml: 1 }} size="small" color="primary" endIcon={<LoginIcon />} loading={loading} loadingPosition="end" variant="contained">
                                Please Login for Reply
                            </LoadingButton>
                        </Link>
                    }
                </Box>
                <div className='answer'>
                    <h4>Answer</h4>
                    {item.answer && Object.values(item.answer).map((ans)=>(
                    <p>
                        <Chip
                            avatar={<Avatar src="/broken-image.jpg" />}
                            label={ans.ans_name}
                            variant="outlined"
                        />{ans.reply}
                    </p>
                    ))}
                </div>
            </Box>
            ))}
            
        </>
    )
}
