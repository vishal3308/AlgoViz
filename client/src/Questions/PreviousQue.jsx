import React, { useEffect, useState, useContext } from 'react';
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
    const Name = localStorage.getItem('AlgoViz_name');
    const [loading, setLoading] = useState(false);
    const [QuestionList, setQuestion] = useState([]);
    const [error, setError] = useState(false);
    const [Reply, setReply] = useState('');
    const [success, setSuccess] = useState(false);
    const [targetReplyEvent, settargetReplyEvent] = useState('');

    const ReplyChange = (e) => {
        setReply(e.target.value);
        settargetReplyEvent(e);
    }

    const handlereply = (Queid) => {
        if (!Reply) {
            setError("Please write the Reply before post");
            return setTimeout(() => {
                setSuccess(false);
                setError(false);
            }, 5000)
        }
        setLoading(true);
        setError(false)
        // ========================= API Calling for Reply Question===================
        const data = {
            queid: Queid,
            reply: Reply,
            name: Name
        }
        fetch(url + '/postreply', {
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
                    setSuccess(res.Message);
                    setReply('');
                    targetReplyEvent.target.value="";
                }
            }).catch((err) => {
                setError("Something went Wrong, please try again.")
            }).finally(() => {
                setLoading(false);
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        setSuccess(false);
                        setError(false);
                        resolve();
                    }, 10000)
                })
            })

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

    }, [success, props.successpost])
    return (
        <>
            <h3>Previous Questions</h3>
            {error && <Alert severity="error" className='PrequeError'>{error}</Alert>}
            {success && <Alert severity="success" className='PrequeError'>{success}</Alert>}
            {QuestionList.map((item, index) => (
                <Box sx={{ border: '1px solid grey', p: 1, borderRadius: "10px", m: 1 }} key={index}>
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
                        onChange={(e) => ReplyChange(e)}
                        placeholder="Please write your Answer"
                        style={{ width: "80%", borderRadius: "5px" }}
                    />
                    <Box sx={{ m: 1 }}>
                        {Auth ?
                            <LoadingButton
                                sx={{ ml: 1 }}
                                size="small"
                                color="success"
                                onClick={() => handlereply(item._id)}
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
                        {item.answer && Object.values(item.answer).map((ans, val) => (
                            <p key={val}>
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
