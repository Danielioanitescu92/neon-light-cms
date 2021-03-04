import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addItem, getSpecificItems } from '../actions/itemActions'
import { sendTheNewPost } from '../actions/subActions'

import EditorJs from 'react-editor-js';
import Header from '@editorjs/header'; 
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import LinkTool from '@editorjs/link'; 
import Marker from '@editorjs/marker';  
import Warning from '@editorjs/warning'; 
import Delimiter from '@editorjs/delimiter'

const AddPost = () => {
    const byWho = useSelector(store => store.auth.user)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ file, setFile ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ subtitle, setSubtitle ] = useState('')
    const [ text, setText ] = useState('')
    const [ tagText, setTagText ] = useState('')
    const [ tag1, setTag1 ] = useState('')
    const [ tag2, setTag2 ] = useState('')
    const [ tag3, setTag3 ] = useState('')
    const [ tag4, setTag4 ] = useState('')  
    const [ data, setData ] = useState(null)
    
    const handlePic = e => setFile(e.target.value)
    const handleTitle = e => setTitle(e.target.value)
    const handleSubtitle = e => setSubtitle(e.target.value)    
    const handleTags = e => setTagText(e.target.value)

    const addTag = e => {
        if(e.keyCode === 32){
            console.log("space bar pressed");
            if(tag1 === '') {
                setTag1(tagText)
                setTagText('')
            } else if(tag2 === '') {
                setTag2(tagText)
                setTagText('')
            } else if(tag3 === '') {
                setTag3(tagText)
                setTagText('')
            } else if(tag4 === '') {
                setTag4(tagText)
                setTagText('')
            } else {
                console.log("no more tags available");
            }
        }
    }

    const delTag = e => {
        console.log("delete tag");
        if(e.target.id == 'tag1'){
            console.log("tag1");
            setTag1('')
        } else if(e.target.id == 'tag2'){
            console.log("tag2");
            setTag2('')
        } else if(e.target.id == 'tag3'){
            console.log("tag3");
            setTag3('')
        } else if(e.target.id == 'tag4'){
            console.log("tag4");
            setTag4('')
        }
    }

    const handleSubmit = e => {
        const newItem = {
            views: {
                organic: [],
                facebook: [],
                googleAds: [],
                total: 0
            },
            commCount: 0,
            picUrl: file,
            title: title,
            subtitle: subtitle,
            text: text,
            by: byWho.name,
            tags: [ 
                {tag: tag1},
                {tag: tag2},
                {tag: tag3},
                {tag: tag4},
            ]
        }
        dispatch(addItem(newItem))
        dispatch(sendTheNewPost(newItem))
        setFile('')
        setTitle('')
        setSubtitle('')
        setText('')
        setTag1('')
        setTag2('')
        setTag3('')
        setTag4('')
        history.push('/')
        dispatch(getSpecificItems(null, null, null, null))
    }
    
    const instanceRef = useRef(null)

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        setText(savedData)
    }

    return (
        <div>
            <div className={styles.addpost}>
                <b>Picture URL</b>
                <input name="text" type="text" value={file} onChange={handlePic}></input>
                <b>Title</b>
                <input name="title" type="text" value={title} onChange={handleTitle}></input>
                <b>Subtitle</b>
                <input name="subtitle" type="text" value={subtitle} onChange={handleSubtitle}></input>
                <b>Main Text</b>
                <div className={styles.myedit}>
                    <EditorJs
                        instanceRef={instance => instanceRef.current = instance} 
                        tools={{ 
                            header: Header, 
                            paragraph: Paragraph,
                            list: List,
                            quote: Quote,
                            linkTool: LinkTool,
                            marker: Marker,
                            warning: Warning,
                            delimiter: Delimiter
                        }}
                        data={data}
                        onChange={handleSave}
                    />
                </div>
                <b>Tags</b>
                <input name="tagText" type="text" value={tagText} onKeyDown={addTag} onChange={handleTags}></input>
                <div>
                    <span id='tag1' className={tag1 ? styles.mytag : null} onClick={delTag}>{tag1 ? tag1 : tag1 === '' ? null : null}</span>
                    <span id='tag2' className={tag2 ? styles.mytag : null} onClick={delTag}>{tag2 ? tag2 : tag2 === '' ? null : null}</span>
                    <span id='tag3' className={tag3 ? styles.mytag : null} onClick={delTag}>{tag3 ? tag3 : tag3 === '' ? null : null}</span>
                    <span id='tag4' className={tag4 ? styles.mytag : null} onClick={delTag}>{tag4 ? tag4 : tag4 === '' ? null : null}</span>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <h1>Preview:</h1>
            <div>
                {text ?
                    text.blocks ?
                        text.blocks.map(elem =>
                            elem.type === 'header' ?
                                <h3 key={elem.data.text}>{elem.data.text}</h3>
                            : elem.type === 'paragraph' ?
                                <p key={elem.data.text}>{elem.data.text}</p>
                            : elem.type === 'list' ?
                                elem.data.style === 'ordered' ?
                                    <ol key={uuidv4()}>
                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                    </ol>
                                : 
                                    <ul key={uuidv4()}>
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
                    : null
                : null}
            </div>
        </div>
    )
}

export default AddPost
