import React, { Component } from 'react';
import { Card, Input, List, Button, Tooltip, Spin, Icon, Collapse, Table } from 'antd';
import { withAppContext } from '../context'

import { request, norm } from '../utils/data'
import Header from '../components/Header'

import Helper from '../components/Helper'

const ButtonGroup = Button.Group;
const Search = Input.Search;
const Item = List.Item;
const Panel = Collapse.Panel;

const colsAnatomp = [
    {
        title: 'Roteiro',
        dataIndex: 'nome',
        key: 'nome',
    },
    {
        title: 'Disciplina',
        dataIndex: 'roteiro.disciplina',
        key: 'roteiro.disciplina',
    },
    {
        title: 'Curso',
        dataIndex: 'roteiro.curso',
        key: 'roteiro.curso',
    },
    {
        title: 'Instituição',
        dataIndex: 'instituicao',
        key: 'instituicao',
    },

]

const colsRoteiro = [
    {
        title: 'Roteiro',
        dataIndex: 'nome',
        key: 'nome',
    },
    {
        title: 'Disciplina',
        dataIndex: 'disciplina',
        key: 'disciplina',
    },
    {
        title: 'Curso',
        dataIndex: 'curso',
        key: 'curso',
    },

]

const Crud = ({ onEdit, onDelete }) => {
    return (
        <ButtonGroup>
            <Tooltip title='Editar'><Button type={'primary'} ghost onClick={onEdit} icon='edit' /></Tooltip>
            <Tooltip title='Remover'><Button type={'primary'} ghost onClick={onDelete} icon='delete' /></Tooltip>
        </ButtonGroup>
    )
}

const CardTitle = ({ children, loading }) => <div className='anatome-card-title'>{children}{loading ? <Spin size="small" style={{ marginLeft: 5 }} /> : null}</div>

class Main extends Component {

    state = {
        anatomp: [],
        roteiros: [],
        originais: {
            anatomp: [],
            roteiros: []
        }
    }

    componentDidMount() {
        const { onOpenSnackbar, onSetAppState } = this.props;

        Promise.all([request('anatomp'), request('roteiro')])
            .then(([anatomp, roteiros]) => {
                this.setState({
                    anatomp: anatomp.data,
                    roteiros: roteiros.data,
                    originais: {
                        anatomp: anatomp.data,
                        roteiros: roteiros.data,
                    }
                })
            })
            .catch(e => {
                console.error(e);
                onOpenSnackbar('Falha ao obter as informações do servidor')
            })
            .finally(() => {
                onSetAppState({ loading: false })
            })
    }

    render() {
        const { loading, history } = this.props;
        const { anatomp, roteiros } = this.state;

        return (
            <div style={{padding: 24}}>
                <div style={{ textAlign: 'right', marginBottom: 5 }}>
                    <Button size='small' type='primary' ghost onClick={() => history.push('/pecas')}>Editar peças</Button>
                </div>
                <Collapse bordered={false} defaultActiveKey={['roteiro_digital', 'roteiro_com_peca']} >
                    <Panel className='anatome-panel' header={
                        <Header
                            loading={loading}
                            contentQ={<p>....</p>}
                            title="Roteiros digitais"
                            extra={<Button type='primary' onClick={() => history.push('/roteiro/cadastrar')} style={{ marginRight: 25 }}><Icon type='plus' />Cadastrar</Button>}
                        />}
                        key='roteiro_digital'>
                        <div style={{ margin: 10, textAlign: 'right' }}>
                            <Search
                                placeholder="Filtrar"
                                onSearch={this.onFilterRoteiro}
                                style={{ width: 200, marginRight: 5 }}
                            />
                        </div>
                        <Table
                            locale={{ emptyText: loading ? <Spin /> : 'Nenhum roteiro digital foi encontrado' }}
                            columns={[
                                ...colsRoteiro,
                                {
                                    title: '',
                                    key: 'action',
                                    width: 100,
                                    render: (text, item) => <Crud onEdit={() => history.push('/roteiro/editar/' + item._id)} onDelete={() => alert()} />,
                                }
                            ]}
                            rowKey='_id'
                            pagination={{ style: { textAlign: 'center', width: '100%' } }}
                            dataSource={roteiros}
                        />
                    </Panel>
                    <Panel className='anatome-panel' header={
                        <Header
                            loading={loading}
                            contentQ={<p>....</p>}
                            title="Roteiros com peças físicas"
                            extra={<Button type='primary' onClick={() => history.push('/mapeamento/cadastrar')} style={{ marginRight: 25 }}><Icon type='plus' />Cadastrar</Button>}
                        />}
                        key='roteiro_com_peca'>
                    <div style={{ margin: 10, textAlign: 'right' }}>
                            <Search
                                placeholder="Filtrar"
                                onSearch={this.onFilterAnatomp}
                                style={{ width: 200, marginRight: 5 }}
                            />
                        </div>
                        <Table
                            locale={{ emptyText: loading ? <Spin /> : 'Nenhum roteiro de peça física foi encontrado' }}
                            columns={[
                                ...colsAnatomp,
                                {
                                    title: '',
                                    key: 'action',
                                    width: 100,
                                    render: (text, item) => <Crud onEdit={() => history.push('/mapeamento/editar/' + item._id)} onDelete={() => alert()} />,
                                }
                            ]}
                            rowKey='_id'
                            pagination={{ style: { textAlign: 'center', width: '100%' } }}
                            dataSource={anatomp}
                        />
                    </Panel>
                </Collapse>
            </div>
        )
    }

    onFilterAnatomp = val => {
        const list = this.state.originais.anatomp;

        const _val = norm(val);
                
        const _list = list.filter(p => {
            return (
                norm(p.nome).indexOf(_val) != -1 ||
                norm(p.instituicao).indexOf(_val) != -1 ||
                norm(p.roteiro.curso).indexOf(_val) != -1 ||
                norm(p.roteiro.disciplina).indexOf(_val) != -1
            )
        });

        this.setState({anatomp: _list})
    }

    onFilterRoteiro = val => {
        const list = this.state.originais.roteiros;

        const _val = norm(val);
                
        const _list = list.filter(p => {
            return (
                norm(p.nome).indexOf(_val) != -1 ||
                norm(p.curso).indexOf(_val) != -1 ||
                norm(p.disciplina).indexOf(_val) != -1
            )
        });

        this.setState({roteiros: _list})
    }    

}

export default withAppContext(Main);