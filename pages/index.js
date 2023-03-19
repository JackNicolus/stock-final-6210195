import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier 1', phone: '1234567890', address: 'Address 1' },
    { id: 2, name: 'Supplier 2', phone: '0987654321', address: 'Address 2' },
  ])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const addSupplier = () => {
    const newSupplier = {
      id: suppliers.length + 1,
      name: name,
      phone: phone,
      address: address,
    }
    setSuppliers([...suppliers, newSupplier])
    setName('')
    setPhone('')
    setAddress('')
  }

  const deleteSupplier = (id) => {
    const newSuppliers = suppliers.filter((supplier) => supplier.id !== id)
    setSuppliers(newSuppliers)
  }

  const updateSupplier = (id) => {
    const updatedSuppliers = suppliers.map((supplier) => {
      if (supplier.id === id) {
        return {
          ...supplier,
          name: name || supplier.name,
          phone: phone || supplier.phone,
          address: address || supplier.address,
        }
      } else {
        return supplier
      }
    })
    setSuppliers(updatedSuppliers)
    setName('')
    setPhone('')
    setAddress('')
  }
  return (
    <>
      <Head>
        <title>Supplier Management App</title>
        <meta name="description" content="Supplier Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Supplier Management App
          </p>
        </div>

        <div className={styles.center}>
        
        <div className={styles.grid}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                  <td>
                    <button onClick={() => deleteSupplier(supplier.id)}>
                      Delete
                    </button>
                    <button onClick={() => updateSupplier(supplier.id)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h2>Add</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button onClick={addSupplier}>Add Supplier</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}




