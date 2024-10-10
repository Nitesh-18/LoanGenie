import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, Text, Group, Stack } from '@mantine/core';

const loanTypeIcons = {
    'Home Loan': '/home.png',
    'Car Loan': '/car.png',
    'Personal Loan': '/personal.png',
    'Education Loan': '/education.png',
    'Business Loan': '/business.png',
};

const staticBankOptions = {
    'Home Loan': [
        { id: '1', name: 'HDFC Bank', interest_rate: 6.5, processing_fee: '0.5%', tenure: '10-30 years', loan_amount: 'Up to ₹10 crore', link: 'https://www.hdfcbank.com', logo: '/hdfc-logo.png' },
        { id: '2', name: 'ICICI Bank', interest_rate: 6.8, processing_fee: '1%', tenure: '10-30 years', loan_amount: 'Up to ₹5 crore', link: 'https://www.icicibank.com', logo: '/icici-logo.png' },
    ],
    'Car Loan': [
        { id: '3', name: 'Axis Bank', interest_rate: 7.0, processing_fee: '0.75%', tenure: '1-7 years', loan_amount: 'Up to ₹50 lakh', link: 'https://www.axisbank.com', logo: '/axis-logo.png' },
        { id: '4', name: 'State Bank of India', interest_rate: 7.5, processing_fee: '1%', tenure: '1-7 years', loan_amount: 'Up to ₹1 crore', link: 'https://www.sbi.co.in', logo: '/sbi-logo.png' },
    ],
    'Personal Loan': [
        { id: '5', name: 'Bank of Baroda', interest_rate: 10.0, processing_fee: '2%', tenure: '1-5 years', loan_amount: 'Up to ₹10 lakh', link: 'https://www.bankofbaroda.in', logo: '/bob-logo.png' },
        { id: '6', name: 'Kotak Mahindra Bank', interest_rate: 10.5, processing_fee: '2%', tenure: '1-5 years', loan_amount: 'Up to ₹20 lakh', link: 'https://www.kotak.com', logo: '/kotak-logo.png' },
    ],
    'Education Loan': [
        { id: '7', name: 'Punjab National Bank', interest_rate: 8.0, processing_fee: '1%', tenure: '5-15 years', loan_amount: 'Up to ₹50 lakh', link: 'https://www.pnbindia.in', logo: '/pnb-logo.png' },
        { id: '8', name: 'Canara Bank', interest_rate: 8.5, processing_fee: '1.5%', tenure: '5-15 years', loan_amount: 'Up to ₹30 lakh', link: 'https://www.canarabank.com', logo: '/canara-logo.png' },
    ],
    'Business Loan': [
        { id: '9', name: 'Union Bank of India', interest_rate: 9.0, processing_fee: '1%', tenure: '1-10 years', loan_amount: 'Up to ₹5 crore', link: 'https://www.unionbankofindia.co.in', logo: '/ubi-logo.png' },
        { id: '10', name: 'IndusInd Bank', interest_rate: 9.5, processing_fee: '1%', tenure: '1-10 years', loan_amount: 'Up to ₹10 crore', link: 'https://www.indusind.com', logo: '/indusind-logo.png' },
    ],
};

const ApplyLoan = () => {
    const [loanTypes, setLoanTypes] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);

    useEffect(() => {
        const fetchLoanTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/loan_types');
                setLoanTypes(response.data);
            } catch (error) {
                console.error('Error fetching loan types:', error);
            }
        };
        fetchLoanTypes();
    }, []);

    const handleLoanChange = (loanType) => {
        setSelectedLoan(loanType);
        const banksForLoan = staticBankOptions[loanType] || [];
        setBanks(banksForLoan);
        setSelectedBank(null);
    };

    return (
        <motion.div
            className="p-8 rounded-lg shadow-lg bg-white max-w-full mx-auto transition-all duration-500"
            style={{ width: '80%' }} // Set the width of the component to 80%
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-4xl font-bold text-center mb-6">Apply for a Loan</h2>
            <label htmlFor="loanType" className="block text-xl font-semibold mb-3">Choose Loan Type:</label>

            <div className="flex justify-around mb-4">
                {loanTypes.map(loan => (
                    <div
                        key={loan._id}
                        onClick={() => handleLoanChange(loan.type)}
                        className={`flex flex-col items-center p-4 border rounded-md cursor-pointer transition-colors duration-200 ${selectedLoan === loan.type ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    >
                        <img src={loanTypeIcons[loan.type]} alt={`${loan.type} icon`} className="w-16 h-16 mb-2" />
                        <span className="text-center text-lg">{loan.type}</span>
                    </div>
                ))}
            </div>

            {selectedLoan && banks.length > 0 && (
                <div>
                    <h3 className="text-3xl font-semibold mb-4 text-center">Choose a Bank for {selectedLoan}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {banks.map(bank => (
                            <Card
                                key={bank.id}
                                className="mb-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg border border-gray-300 rounded-lg"
                                padding="xl"
                                style={{ backgroundColor: '#e0f7fa', color: 'black', fontSize: '1.2rem' }}
                            >
                                <Group position="apart" align="center" noWrap>
                                    <a href={bank.link} target="_blank" rel="noopener noreferrer">
                                        <img src={bank.logo} alt={`${bank.name} logo`} className="w-20 h-20" />
                                    </a>
                                    <Text
                                        weight={700}
                                        size="xl"
                                        align="center"
                                        style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.6rem' }} // Attractive font for bank name
                                    >
                                        {bank.name}
                                    </Text>
                                </Group>
                                <Stack spacing="xs" mt="sm" align="center">
                                    <Text style={{ color: '#00796b' }}>Interest Rate: <strong>{bank.interest_rate}%</strong></Text>
                                    <Text style={{ color: '#ffb300' }}>Processing Fee: <strong>{bank.processing_fee}</strong></Text>
                                    <Text style={{ color: '#388e3c' }}>Tenure: <strong>{bank.tenure}</strong></Text>
                                    <Text style={{ color: '#6a1b9a' }}>Loan Amount: <strong>{bank.loan_amount}</strong></Text>
                                </Stack>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {selectedLoan && banks.length === 0 && (
                <div className="text-red-500 text-center">
                    <p>No banks available for the selected loan type.</p>
                </div>
            )}
        </motion.div>
    );
};

export default ApplyLoan;
