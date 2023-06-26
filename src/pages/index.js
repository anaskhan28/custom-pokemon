import Head from 'next/head'
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { HashLoader } from 'react-spinners';
import styles from '@/styles/Home.module.scss'

export default function Home() {
  const [attributes, setAttributes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 
   const [image, setImage] = useState();

   const  onGenerate = async (e) =>{
    e.preventDefault();
    setAttributes({})
    setImage(undefined)
    setIsLoading(true)
    const results = await fetch('/api/pokemon/create')
    .then(r => r.json());
   
    setAttributes(results.attributes)
  
    const {image} = await fetch('/api/pokemon/image',{
      method: 'POST',
      body: JSON.stringify({
        description: results.attributes.appearance
      })
    }).then(r => r.json())

    setImage(image);
    setIsLoading(false)

   }

   useEffect(() => {
    // Retrieve existing data from local storage
    const storedData = JSON.parse(window.localStorage.getItem('pokemondata')) || [];
    
    
    const updatedData = [...storedData, { ...attributes, ...image }];

    const filteredData = updatedData.filter(item => item.url && Object.keys(item).length > 0);
    

    // Store the updated array of objects in local storage
    window.localStorage.setItem('pokemondata', JSON.stringify(filteredData));
  
  }, [attributes, image]);
 

  return (
    <Layout>
      <Head>
        <title>Pokémon Generator</title>
        <meta name="description" content="Create a new Pokémon with AI!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container className={styles.cardContainer}>
          <div className={styles.card}>
            <Card attributes={attributes} image={image} />
            <h2>Backstory</h2>
            <p>{attributes?.backstory}</p>
          </div>
          <Form className={styles.form}>
            <h2>Create a new Pokémon!</h2>
            {/* <FormRow>
              <label>Type</label>
              <FormInput name="type" />
            </FormRow> */}
            <FormRow>
            {isLoading ? <HashLoader color="#2673e9" />:
  <Button onClick={onGenerate}>Generate</Button>}
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}
