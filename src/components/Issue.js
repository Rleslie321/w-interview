// component to display a particular issue from the num parameter passed in the url

import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';


function Issue(){
    const [issue, setIssue] = useState(null);
    let {num} = useParams(); //grab the num from the url

    // update title, and fetch specific issue, acts like componentdidmount
    useEffect(()=>{
        document.title = `Issue #${num}`;
        fetch(`https://api.github.com/repos/walmartlabs/thorax/issues/${num}`)
        .then(response => response.json())
        .then(issue => setIssue(issue))
        .catch(err => {
            console.log('Error:', err);
        });
    }, [num]);

    
    return(
        <>  
        {/* returns information once issue has been retrieved from github */}
        {issue === null ? "" : <div className="issue">
                                    <div className="issue-header">
                                        <h1>Issue: {issue.number}</h1> 
                                        <h3>Status: <span className={issue.state === "open" ? "green" : "red"}>{issue.state}</span></h3>
                                    </div>
                                    <p><span className="bold">Title:</span>  {issue.title}</p>
                                    <p><span className="bold">Author:</span>  {issue.user.login}</p>
                                    <p>{issue.body}</p>
                                    <p className="small">{Date(issue.created_at).toString()}</p>
                                </div>
        }
        </>
    );
    
}

export default Issue;