import React, { useState, useEffect } from 'react'
import styles from './styles/PostPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getThisItem, doneEditingCC } from '../../../actions/itemActions'
import { getThisComms, addComment, deleteComment, addLike, removeLike } from '../../../actions/commentActions'
import { getThisReps, addReply, deleteReply, addRLike, removeRLike } from '../../../actions/replyActions'
import { getItemsFiles, goItemsFiles } from '../../../actions/fileActions'

const PostPage = ({ match }) => {
    const dispatch = useDispatch()

    const [ myItem, setMyItem ] = useState({})
    const [ comment, setComment ] = useState('')
    const [ parentComm, setParentComm ] = useState('')
    const [ reply, setReply ] = useState(false)
    
    const byWho = useSelector(store => store.auth.user)
    const itemz = useSelector(store => store.item.items)
    const commentz = useSelector(store => store.comment.comments)
    const repliez = useSelector(store => store.reply.replies)
    const picz = useSelector(store => store.file.files.items)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

    useEffect(() => {
        if(byWho) {
            dispatch(getThisItem(match.params.id))
            dispatch(getThisComms(match.params.id))
            dispatch(getThisReps(match.params.id))
        }
    }, [byWho])

    useEffect(() => {
        dispatch(goItemsFiles());
        if(byWho) {
            if(itemz) {
                if(itemz._id === match.params.id) {
                    setMyItem(itemz)
                }
                if(itemz.picUrl) {
                    if(!piczLoading) {
                        if(!itemzLoading) {
                            dispatch(getItemsFiles([itemz.picUrl]))
                        }
                    }
                }
            }
        }
    }, [itemz])

    const handleComment = e => setComment(e.target.value)
    const handleReply = e => {
        setReply(true)
        setParentComm(e.target.id)
    }

    const addingComment = e => {
        e.preventDefault()
        let editedPost = myItem
        if(!reply) {
            const newComment = {
                name: byWho.name,
                email: byWho.email,
                comment: comment,
                forWich: myItem._id
            }
            dispatch(addComment(newComment))
        } else {
            const newReply = {
                name: byWho.name,
                email: byWho.email,
                comment: comment,
                forWich: myItem._id,
                parentComm: parentComm
            }
            dispatch(addReply(newReply))
        }
        setComment('')
        setParentComm('')
        setReply(false)
        // modify item.countComm:
        editedPost = {...editedPost, commCount: editedPost.commCount+1}
        dispatch(doneEditingCC(editedPost))
    }

    const handleDelComm = e => {
        let editedPost = myItem
        if(repliez) {
            repliez.map(rep => {
                if(rep.parentComm === e.target.id) {
                    dispatch(deleteReply(rep._id, match.params.id))

                    // modify item.countComm:
                    editedPost = {...editedPost, commCount: editedPost.commCount-1}
                }
            })
        }
        if(reply) {
            setReply(false)
        }
        dispatch(deleteComment(e.target.id, match.params.id))

        // modify item.countComm:
        editedPost = {...editedPost, commCount: editedPost.commCount-1}
        dispatch(doneEditingCC(editedPost))
    }

    const handleDelRep = e => {
        let editedPost = myItem
        dispatch(deleteReply(e.target.id, match.params.id))
        if(reply) {
            setReply(false)
        }
        // modify item.countComm:
        editedPost = {...editedPost, commCount: editedPost.commCount-1}
        dispatch(doneEditingCC(editedPost))
    }

    const handleCommLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(addLike(newLike))
        }
    }
        
    const handleCommUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(removeLike(newLike))
        }
    }

    const handleRepLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(addRLike(newLike))
        }
    }

    const handleRepUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(removeRLike(newLike))
        }
    }

    return (
        <div className={styles.thelist}>
            {itemz ?
                itemz._id === match.params.id ?
                    <div key={itemz._id} className={styles.itemz}>

                        <div className={styles.post}>
                            <div>
                                {picz ?
                                    picz.length > 0 ?
                                        picz.map(pic =>
                                            pic === null ?
                                                null
                                            : pic.filename === itemz.picUrl ?
                                                <img key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={itemz.title} width="50" height="50"></img>
                                            : null
                                        )
                                    : null
                                : null}
                            </div>
                            <div>
                                <Link to={`/author/${itemz.by}`}> <p>{itemz.by}</p> </Link>
                            </div>
                            <div>
                                <p>{itemz.views.total} views</p>
                            </div>
                            <div>
                                <p>{itemz.commCount} comments</p>
                            </div>
                            <div>
                                <h2>{itemz.title}</h2>
                            </div>
                            <div>
                                <h4>{itemz.subtitle}</h4>
                            </div>
                            <div>
                                {itemz.text ?
                                    itemz.text.blocks ?
                                        itemz.text.blocks.map(elem =>
                                            elem.type === 'header' ?
                                                <h3 key={elem.data.text}>{elem.data.text}</h3>
                                            : elem.type === 'paragraph' ?
                                                <p key={elem.data.text}>{elem.data.text}</p>
                                            : elem.type === 'list' ?
                                                elem.data.style === 'ordered' ?
                                                    <ol key={elem._id}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                            : 
                                                    <ul key={elem._id}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ul>
                                            : elem.type === 'delimiter' ?
                                                <h2 key='delimiter'>* * *</h2>
                                            : elem.type === 'quote' ?
                                                <div key='quote'>
                                                    <div>
                                                        <span><h2>"</h2></span>
                                                        <span><p>{elem.data.text}</p></span>
                                                        <span><h2>"</h2></span>
                                                    </div>
                                                    <div>
                                                        <span><h2>By </h2></span>
                                                        <span><p>{elem.data.caption}</p></span>
                                                    </div>
                                                </div>
                                            : elem.type === 'linkTool' ?
                                                <a href={elem.data.link} key={elem.data.link}>
                                                    <b>{elem.data.link}</b>
                                                </a>
                                            : elem.type === 'warning' ?
                                                <div key='warning'>
                                                    <span><h2>! </h2></span>
                                                    <span>
                                                        <div>
                                                            <b>{elem.data.title}</b>
                                                        </div>
                                                        <div>
                                                            <p>{elem.data.message}</p>
                                                        </div>
                                                    </span>
                                                </div>
                                            : null
                                        )
                                    : <p>{itemz.text}</p>
                                : null}
                            </div>
                            <div>
                                <p>{itemz.date.slice(0,10)} {itemz.date.slice(11,19)}</p>
                            </div>
                            <div>
                                {itemz.tags ?
                                    itemz.tags.map(t => <div key={t._id}>
                                        <Link to={`/search/${t.tag}`}> <p>{t.tag}</p> </Link>
                                    </div>)
                                : null}
                            </div>
                        </div>

                        <div>

                            <h1>{itemz.commCount} Comments</h1>

                            {commentz ? commentz.map(comm => 
                                comm.forWich === itemz._id ?
                                    <div key={comm._id} className={styles.comment}>
                                        <div>
                                            <h2>{comm.name}</h2>
                                            <p>{comm.date.slice(0,10)} {comm.date.slice(11,19)}</p>
                                        </div>
                                        <div>
                                            <p>{comm.comment}</p>
                                        </div>
                                        <div>
                                            <p>{comm.likes.length}</p>                                            
                                                {
                                                    comm.likes.length > 0 ?
                                                        comm.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                            <button value={comm._id} onClick={handleCommUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                        : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                    : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                }
                                        </div>
                                        <div>
                                            <a href='#form' id={comm._id} onClick={handleReply}> Reply </a>
                                        </div>
                                        {byWho ?
                                            byWho.role === "admin" ?
                                                <button id={comm._id} onClick={ handleDelComm }> X </button>
                                            : null
                                        : null}                                        

                                        <div>
                                            {repliez ? repliez.map(rep =>
                                                rep.parentComm === comm._id ?
                                                    <div key={rep._id} className={styles.reply}>
                                                        <div>
                                                            <h2>{rep.name}</h2>
                                                            <p>{rep.date.slice(0,10)} {rep.date.slice(11,19)}</p>
                                                        </div>
                                                        <div>
                                                            <p>{rep.comment}</p>
                                                        </div>
                                                        <div>
                                                            <p>{rep.likes.length}</p> 
                                                            {
                                                                rep.likes.length > 0 ?
                                                                    rep.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                                        <button value={rep._id} onClick={handleRepUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                                    : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                            }
                                                        </div>
                                                        {byWho ?
                                                            byWho.role === "admin" ?
                                                            <button id={rep._id} onClick={handleDelRep} > X </button>
                                                            : null
                                                        : null}                                                        
                                                    </div>
                                                : null
                                            ) : null}
                                        </div>

                                    </div>
                                : null
                            ) : null}

                            {byWho ? 
                                <div>
                                    <h3>Add a comment</h3>
                                    <form id="form" onSubmit={addingComment}>
                                        <textarea name="comment" rows="5" value={comment} onChange={handleComment} />
                                        <input type="submit" value={reply ? "Add Reply" : "Add comment"} ></input>
                                    </form>
                                </div>
                            : null}

                        </div>
                    </div>
                : null
            // )
            : null}
        </div>
    )
}

export default PostPage
