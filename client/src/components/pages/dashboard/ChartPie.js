import React from 'react'

const ChartPie = ({ viewsUsez, colors }) => { 
    
    let tot = 0
    let newvt = []
    let B
    let C = []
    let D = []    

    if(viewsUsez) {

        if(Array.isArray(viewsUsez)) {
            for ( let i = 0; i < viewsUsez.length; i++ ) {
                tot = tot + viewsUsez[i].counting
            }    
    
            B = viewsUsez.sort((a, b) => a.counting - b.counting)
        } else {    
            Object.keys(viewsUsez).map(key => {
                newvt.push({name: key, counting: viewsUsez[key]})
            })  
            for ( let i = 0; i < newvt.length; i++ ) {
                tot = tot + newvt[i].counting
            }   
    
            B = newvt.sort((a, b) => a.counting - b.counting)
        }
        
        B.map(b => {
            if(tot) {
                colors.map(col => {
                    if(col.name === b.name) {
                        C.push({    counting: (((((b.counting)*100) / tot) * 360) / 100), name: b.name, color: col.color    })
                    }
                })
            }
        })
    
        if(C) {
            C.map((item, index, array) => {
                let tot = 0
                for(let i=0; i<array.length; i++){
                    if(array[i].counting < item.counting) {
                        tot += array[i].counting
                    }
                }
                const it = {a:tot, b:tot+item.counting, name: item.name, color: item.color}
                D.push(it)
            })
        }

        if(D.length === 0) {
            D=[{a: 0, b: 0, name:'null', color: 'rgb(0,0,0)'}]
        }
    }

    return (
        viewsUsez ?
            <div
                style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    
                    backgroundImage: `conic-gradient(
                        ${
                            D ?
                                D.map(d =>
                                    `${d.color} ${d.a + 'deg ' + d.b + 'deg '} `
                                )
                            : null
                        }
                    )`,

                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'rgb(250,250,250)',
                        top: '50%',
                        left: '50%',
                        margin: '-25px 0px 0px -25px'
                    }}
                ></div>
            </div>
        : null
    )
}

export default ChartPie
