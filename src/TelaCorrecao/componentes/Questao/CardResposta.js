import React from 'react'

import { Typography , Checkbox , Button } from 'antd'

const Text = Typography.Text
const Title = Typography.Title

const CardQuestaoResposta = ({res,style,onCheck,onEdit}) => {

    const bg = ( style && style.backgroundColor ) ? style.backgroundColor : '#f3f3f3'

    return (
        <div style={{
            display:'flex', 
            flexDirection:'column', 
            flex:1,
        }}>

            <div style={{display:'flex',backgroundColor:bg,marginBottom:5,padding:5}}>
                <div style={{flex:1}}>{res.pai}</div>
                { onEdit 
               ? <div style={{flex:1,textAlign:'right'}}>
                   <Button onClick={onEdit} type='secondary' icon='edit'></Button> 
                   <Button type='secondary' icon='delete'></Button> 
                 </div>
               : <div style={{flex:1,textAlign:'right'}}></div>
                }
            </div>

            <div style={{display:'flex',flexDirection:'column',backgroundColor:bg,padding:5}}>

                <Text type="secondary" style={{textAlign:'center',width:'100%',marginBottom:5}}>
                    Parte {res.numero}
                </Text>

                <div style={{display:'flex'}}>
                    <div style={{flex:1}}>{res.nome}</div>
                    <div style={{flex:1,textAlign:'right'}}>
                        <Checkbox 
                            value={res.correta} 
                            onChange={ ({target}) => onCheck(target.checked) } 
                        />
                    </div>
                </div>

            </div>

            <div style={{backgroundColor:bg,display:'flex'}}>
                <div style={{flex:0.15}}> </div>
                <div style={{flex:2}}><hr/></div>
            </div>

            <div style={{backgroundColor:bg,padding:5,overFlowWrap:'word-wrap',flex:1}}>
                {res.descricao}
            </div>


        </div>
    )
}

export default CardQuestaoResposta
