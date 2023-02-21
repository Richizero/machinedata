const { VITE_BASE_API: API } = process.env

const instance = {}

const create = async (endpoint, data, token) => {
    const newMachine = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return await newMachine.json()
}


const get = async (endpoint) => {
    return await fetch(`${API}${endpoint}`).then(res => res.json())
}


const getOne = async (endpoint, id) => {
    return await fetch(`${API}${endpoint}/${id}`).then(res => res.json())
}


const update = async (endpoint, data, id) => {
    return await fetch(`${API}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}


const getDate = async (endpoint, id, inputDate) => {

    const date = await fetch(`${API}${endpoint}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputDate })
    })

    return await date.json()
}


const del = (endpoint, id) => {
    fetch(`${API}${endpoint}/${id}`, { method: 'DELETE' })
}


const log = async (endpoint, userData) => {
    const response = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())

    return response
}


const machines = {
    delete: (id) => (
        del('machine/delete', id)
    ),
    create: (data, token) => (
        create('machine/create', data, token)
    ),
    update: (data, id) => (
        update('machine/update', data, id)
    ),
    get: () => (
        get('machine/get')
    ),
    getOne: (id) => (
        getOne(`machine/get`, id)
    ),
    getDate: (id, inputDate) => (
        getDate('machine/getDate', id, inputDate)
    )
}


const login = {
    login: (data) => (
        log('login', data)
    )
}

instance.machine = machines
instance.login = login


export default instance