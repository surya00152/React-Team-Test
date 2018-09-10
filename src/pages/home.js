import React, {Component} from 'react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'Pugazh',
            data: {
                person: [
                    {   Id:'A1',
                        PersonName:'Kate'
                    },
                    {   Id:'A2',
                        PersonName:'Stephanie'
                    },
                    {   Id:'A3',
                        PersonName:'Lisa'
                    },
                    {   Id:'A4',
                        PersonName:'Joe'
                    },
                    {   Id:'A5',
                        PersonName:'Frank'
                    },
                    {   Id:'A6',
                        PersonName:'Martin'
                    }
                ]
            }
        };
        this.drageId = null;
    }

    _getChildFromId = (id) => {
        const { data: {person} } = this.state;
        return person.filter(({TeamOf, Action}) => {
            if (typeof TeamOf != 'undefined' && typeof Action == 'undefined') {
                return TeamOf[0]['Leader'][0] == id
            }
        })
    }

    _onDrop = (event) => {
        event.preventDefault();
        const dropedId = event.target.id;
        console.log('dropedId', dropedId)
        console.log('this.drageId', this.drageId);

        if (dropedId !== this.drageId && dropedId != '' && this.drageId != '') {
            const { data: {person}, user } = this.state;
            const targetIndex = person.findIndex(({Id}) => Id == this.drageId);

            person[targetIndex]['TeamOf'] = [];

            person[targetIndex]['TeamOf'].push({
                Leader: [dropedId],
                PraposedBy: user,
                Actions: "Make Team"
            })
            this.setState({data:{person}}, () => {
                this.forceUpdate();
            });
        }
    }

    _onDragOver = (event) => {
        event.preventDefault();
        // console.log('drag-over', event);
    }

    _onDragStart = (event) => {
        this.drageId = event.target.id;
    }

    _onRemove = (id) => {
        console.log('id', id);
        const { data: {person}, user } = this.state;
        const targetIndex = person.findIndex(({Id}) => Id == id);
        person[targetIndex]['ProposedBy'] = user;
        person[targetIndex]['Action'] = "Delete";
        this.setState({data:{person}}, () => {
            this.forceUpdate();
        });
    }

    render() {
        const {data:{person}} = this.state;
        return (
            <div className="container">
                <div className="col-sm-8 col-md-8 col-lg-8">
                    {
                        person.map(item => {
                            const child = this._getChildFromId(item.Id);
                            return (
                                (typeof item['TeamOf'] == 'undefined' && typeof item['Action'] == 'undefined') &&
                                    <div key={item.Id}
                                         id={item.Id}
                                         className={`card col-sm-3 col-md-3 col-lg-3 ${child.length > 0 ? 'blue' : 'yellow'} `}
                                         draggable="true"
                                         onDragStart={this._onDragStart.bind(this)}
                                         onDrop={this._onDrop.bind(this)}
                                         onDragOver={this._onDragOver.bind(this)}>
                                        <div className={`container`}>
                                            <h6 className="title pull-left" id={item.Id}>
                                                <b>
                                                    {item.PersonName}
                                                </b>
                                            </h6>
                                            <i onClick={this._onRemove.bind(this, item.Id)} className="close-btn pull-right">&times;</i>
                                        </div>
                                        {
                                            child.map(subItem => (
                                                <div className={`container yellow`} key={`sub-${subItem.PersonName}`}>
                                                    <h6 className="title pull-left" id={item.Id}>
                                                        <b>
                                                            {subItem.PersonName}
                                                        </b>
                                                    </h6>
                                                    <i onClick={this._onRemove.bind(this, subItem.Id)} className="close-btn pull-right">&times;</i>
                                                </div>
                                            ))
                                        }
                                    </div>
                            )
                        })
                    }
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <pre>{JSON.stringify(person, null, 2) }</pre>
                </div>
            </div>
        );
    }
}

export default Home;
