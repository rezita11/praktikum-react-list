import React, {Component} from "react";
import $ from "jquery";
import Card from "../components/cardEvent"
class Agenda extends Component {
    constructor(){
       super()
       this.state = {
            agenda: [
                {
                    nama: "Galasesa",
                    tanggal: "25 Juli 2019",
                    lokasi: "SMK Telkom Malang",
                    gambar: "https://3.bp.blogspot.com/-tF1n9SvNCco/U6jMQi46jLI/AAAAAAAAEKk/BEvsW-pqU_Q/s1600/DSC_0209.JPG"
                },
                {
                    nama: "Bulan Bahasa",
                    tanggal: "28 Oktober 2021",
                    lokasi: "SMK Telkom Malang",
                    gambar: "https://i.ytimg.com/vi/bygymCmm2sY/maxresdefault.jpg?v=5f98c8fd"
                },
                {
                    nama: "MPLS",
                    tanggal: "25 Juni 2019",
                    lokasi: "SMK Telkom Malang",
                    gambar: "https://smktelkom-mlg.sch.id/assets/upload/image/thumbs/BD41A5B2-12E8-47A8-A1DF-6709F604134F.png"
                },
           ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            selectedItem: null,
       } 
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    {this.state.agenda.map( (item, index) => (
                        <Card
                        nama={item.nama}
                        tanggal={item.tanggal}
                        lokasi={item.lokasi}
                        gambar={item.gambar}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    ))}
                </div>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_agenda">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Agenda
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                            <form onSubmit={ev => this.Save(ev)}>
                                Nama Event :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.nama}
                                    onChange={ ev => this.setState({nama:ev.target.value}) }
                                    required />
                                
                                Tanggal :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal: ev.target.value}) }
                                    required />

                                Lokasi :
                                <input type="text" className="form-control b-2"
                                    value={this.state.lokasi}
                                    onChange={ ev => this.setState({lokasi: ev.target.value}) }
                                    required />
                                    
                                Gambar Agenda :
                                <input type="url" className="form-control mb-2"
                                    value={this.state.gambar}
                                    onChange={ ev => this.setState({gambar: ev.target.value}) }
                                    required />

                                <button className="btn btn-info btn-block" type="submit">
                                    Simpan
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    Add = () => {
        // menampilkan komponen modal
        $("#modal_agenda").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_agenda").show();
        this.setState({
        nama: item.nama,
        tanggal: item.tanggal,
        lokasi: item.lokasi,
        gambar: item.gambar,
        action: "update",
        selectedItem: item
        })
    }
    Save = (agenda) => {
        agenda.preventDefault();
        // menampung data state event
        let tempAgenda = this.state.agenda
        if (this.state.action === "insert") {
        // menambah data baru
        tempAgenda.push({
        nama: this.state.nama,
        tanggal: this.state.tanggal,
        lokasi: this.state.lokasi,
        gambar: this.state.gambar,
        })
    }else if(this.state.action === "update"){
        // menyimpan perubahan data
        let index = tempAgenda.indexOf(this.state.selectedItem)
        tempAgenda[index].nama = this.state.nama
        tempAgenda[index].tanggal = this.state.tanggal
        tempAgenda[index].lokasi = this.state.lokasi
        tempAgenda[index].gambar = this.state.gambar
    }
    this.setState({agenda : tempAgenda})
    // menutup komponen modal_agenda
    $("#modal_agenda").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
        // menghapus data
        let tempAgenda = this.state.agenda
        // posisi index data yg akan dihapus
        let index = tempAgenda.indexOf(item)
        // hapus data
        tempAgenda.splice(index, 1)
        this.setState({event: tempAgenda})
        }
    }

}
export default Agenda;
