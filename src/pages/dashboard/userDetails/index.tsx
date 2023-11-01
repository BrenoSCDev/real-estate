import { useState, ChangeEvent } from 'react'
import { UseAuth } from '../../../hooks'
import axiosApi from '../../../services'
import { ModalComponent } from '../../../components/modal'
import { IUser } from '../../../interfaces'

export const UserDetails = () => {
  const { user, signOut } = UseAuth()  
  const [name, setName] = useState<string>(user.name)
  const [familyName, setFamilyName] = useState<string>(user.familyName)
  const [phone, setPhone] = useState<string>(user.phoneNumber)
  const [birthDate, setBirthDate] = useState<string>(user.birthdate)
  const [successShow, setSuccessShow] = useState(false)
  const [errorShow, setErrorShow] = useState(false)

  const handleClose = () => {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const updateUser = async (updatedUserData: IUser) => {
    try {
        const response = await axiosApi.put(`/user/${user.id}`, updatedUserData)
        console.log(response.status)
        if(response.status === 200){
          setSuccessShow(true)
        }
        localStorage.setItem("user", JSON.stringify(updatedUserData))
      } catch (error) {
        console.error(error)
        setErrorShow(true)
      }
  }
  const handleUpdateUser = () => {
    const updatedUserData = { ...user, name: name, familyName: familyName, phoneNumber: phone, birthdate: birthDate }
    updateUser(updatedUserData)
  }
  const [profile, setProfile] = useState<string>("https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg")

  const handleSignOut = () => {
    signOut()
    window.location.reload()
  }
  return (
    
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <div
            className="card position-relative mb-3"
            style={{ overflow: 'hidden' }}
          >
            <img
              src="https://img.freepik.com/fotos-gratis/uma-casa-com-garagem-e-uma-cerca-na-frente_1340-32136.jpg?w=1380&t=st=1695150469~exp=1695151069~hmac=c6df1fde4e72ee76e77c080c14dab0d344332f5bdc2ee512dca8acedf3b6e014"
              className="card-img-top"
              alt="Capa de Fundo"
            />
            <div className="position-absolute top-50 start-50 translate-middle">
              <img
                src={profile}
                className="rounded-circle img-thumbnail"
                alt="Imagem de Perfil"
                width="150"
              />
            </div>
            <div className="card-body text-center">
              <h5 className="card-title mt-3">Olá {user.name}</h5>
              <p className="card-text">{user.email}</p>
            </div>
          </div>
        </div>
      <div className="col-md-8">
        <h2>Dados do Usuário</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={familyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFamilyName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Número de Telefone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">
              Data de Nascimento
            </label>
            <input
              type="text"
              className="form-control"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary col-md-4"
            onClick={handleUpdateUser}
          >
            Atualizar Usuário
          </button>
          <button
            type="button"
            className="btn btn-danger m-3 col-md-4"
            onClick={handleSignOut}
          >
            Sair da minha conta
          </button>
        </form>
        <ModalComponent 
        success={successShow === true ? true : false}
        onShow={successShow === true ? successShow : errorShow}
        onClose={handleClose}
        modalTitle={successShow === true ? 'Usuário atualizado com successo!' : 'Algo deu errado. Tente novamente mais tarde.'}/>
      </div>
    </div>
  </div>
  )
} 