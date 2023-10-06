import React, {useEffect, useState} from 'react';

//components
import { Header } from "../../components";

import Head from "next/head";
import { useRouter } from "next/router";

export default function User(props) {
    const router = useRouter(); // router
    const { username } = router.query;

    return (
      <div className="bg-image">
        <Head>
          <title>
            {username} - Coding Club
          </title>
        </Head>
        <Header {...props} />
      </div>
    )
}
