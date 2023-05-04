--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 15.0

-- Started on 2023-04-16 17:43:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';   
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 20923)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 20958)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 21006)
-- Name: departments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departments (
    name character(50) NOT NULL,
    cost_center integer,
    is_board boolean,
    board character(50)
);


--
-- TOC entry 203 (class 1259 OID 20994)
-- Name: equipments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipments (
    id character(13) NOT NULL,
    brand character(20),
    model character(15),
    supplier character(50),
    invoice character(50),
    warranty character(10),
    purchase_date character(20),
    department character(50),
    status character(30),
    cpu character(10),
    ram character(10),
    slots integer,
    storage0_type character(5),
    storage0_syze integer,
    storage1_type character(5),
    storage1_syze integer,
    video character(20),
    service_tag character(50),
    user_id character(40)
);


--
-- TOC entry 201 (class 1259 OID 20969)
-- Name: stock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stock (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    type character varying(50) NOT NULL,
    amount integer NOT NULL,
    amount_min integer NOT NULL,
    local character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(200) NOT NULL,
    updated_at timestamp without time zone
);


--
-- TOC entry 202 (class 1259 OID 20979)
-- Name: stock_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stock_transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stock_id uuid,
    type character varying(50) NOT NULL,
    partner character varying(100) NOT NULL,
    department character varying(100),
    amount integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by text NOT NULL,
    value character varying(30)
);


--
-- TOC entry 204 (class 1259 OID 20999)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    username character(50) NOT NULL,
    complete_name character(100),
    title character(50),
    department_id character(50),
    telephone integer,
    direct_boss character(50),
    smtp character(50),
    admission_date date,
    demission_date date,
    status character(50)
);


--
-- TOC entry 3758 (class 2606 OID 21010)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (name);


--
-- TOC entry 3752 (class 2606 OID 20998)
-- Name: equipments equipments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipments
    ADD CONSTRAINT equipments_pkey PRIMARY KEY (id);


--
-- TOC entry 3748 (class 2606 OID 20978)
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- TOC entry 3750 (class 2606 OID 20988)
-- Name: stock_transactions stock_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_transactions
    ADD CONSTRAINT stock_transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 3754 (class 2606 OID 21003)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- TOC entry 3756 (class 2606 OID 21005)
-- Name: users users_smtp_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_smtp_key UNIQUE (smtp);


--
-- TOC entry 3763 (class 2606 OID 21019)
-- Name: equipments equipments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipments
    ADD CONSTRAINT equipments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(username);


--
-- TOC entry 3761 (class 2606 OID 20989)
-- Name: stock_transactions stock_transactions_stock_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_transactions
    ADD CONSTRAINT stock_transactions_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES public.stock(id);


-- Completed on 2023-04-16 17:43:21

--
-- PostgreSQL database dump complete
--

