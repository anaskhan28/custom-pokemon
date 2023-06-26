import Card from '@/components/Card/Card'
import React, {useEffect, useState} from 'react'
import styles from '@/styles/pokemon.module.scss'
import Layout from '@/components/Layout/Layout';


const Pokemon = () => {
  const [updatedData, setUpdatedData]= useState();
 useEffect(() =>{
  const pokemonData = JSON.parse(window.localStorage.getItem('pokemondata')) 
  setUpdatedData(pokemonData)
 }, [])
 
  console.log(updatedData)
  
 
  return (
    <Layout>
    <div className={styles.cardContainer}>
    
    {updatedData?.map((item, index) => {
      return (
      <Card
      key={index}
      attributes={item}
      image={item}
      />
      )
      })}
    </div>
    </Layout>
  )
}

export default Pokemon