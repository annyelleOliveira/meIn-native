import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useExpenses } from '../context/ExpensesContext'; // Usando o contexto para moedas

export default function QuizScreen() {
  const { coins, addCoins } = useExpenses(); // Pegando moedas e a função de adicionar moedas do contexto

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Para acompanhar as respostas corretas

  // Perguntas sobre finanças
  const questions = [
    {
      question: 'O que é uma ação?',
      options: ['Parte de uma empresa', 'Uma moeda', 'Um tipo de fundo'],
      correctAnswerIndex: 0,
    },
    {
      question: 'O que são FIIs (Fundos Imobiliários)?',
      options: ['Investimentos em imóveis', 'Ações de empresas', 'Títulos públicos'],
      correctAnswerIndex: 0,
    },
    {
      question: 'O que é um CDB?',
      options: ['Certificado de Depósito Bancário', 'Fundo de Investimento', 'Ação de empresa'],
      correctAnswerIndex: 0,
    },
    // Adicione mais perguntas financeiras conforme necessário
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      setScore(score + 1); // Se acertar, soma um ponto
      addCoins(10); // Ganha 10 moedas por resposta certa
    }

    // Vai para a próxima pergunta ou termina o quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz terminado! Você acertou ${score + 1} de ${questions.length} perguntas.`);
      setScore(0); // Resetar o score após o quiz
      setCurrentQuestionIndex(0); // Volta para a primeira pergunta
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pergunta {currentQuestionIndex + 1} de {questions.length}</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>

      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleAnswer(index)} // Chama a função de resposta ao clicar
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.coins}>Moedas: {coins}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1035',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 20,
  },
  question: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6C5CE7',
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  coins: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
  },
});
