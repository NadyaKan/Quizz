const app = Vue.createApp({
    data() {
        return {
            quiz: {
                title: '',
                creator: userId,
                data: [{
                    question: '', 
                    answers: [],
                }],
            },
        };
    },
    methods: {
        addBlock() {
            this.quiz.data.push({
                question: '',
                answers: [],
            });  
        },
        removeBlock(index) {
            this.quiz.data.splice(index, 1);
        },
        async createQuiz() {
            this.convertStringToBoolean();
            await axios.post('http://localhost:3000/api/quiz/'+userId, this.quiz);
        },
        updateAnswers(updatedAnswers, index){
            this.quiz.data[index].answers = updatedAnswers;
        },
        convertStringToBoolean() {
            this.quiz.data.forEach(block => {
              for(var i = 0; i < block.answers.length; i++){
                  block.answers[i].correct = (block.answers[i].correct === 'true');
              }
            });
        },
    },
})

app.component('answer-component', {
    emits: ['update'],
    props: ['index'],
    data() {
      return {
        answers: [
            {
                option: '',
                correct: false,
            },
        ],
      };
    },
    
    methods: {
        addAnswer() {
            if(this.answers.length < 6){
                this.answers.push({
                    option: '',
                    correct: false,
                });
            }
            this.updateAnswers();
        },
        removeAnswer(index) {
            this.answers.splice(index, 1);
        },

        updateAnswers() {
            this.$emit('update', this.answers);
        },
    },

    template: `
      <div class="answer-row" v-for="(answer, answerIndex) in answers" :key="answer._id">
      <img src="/img/remove.svg" alt="" @click="removeAnswer(answerIndex)">
      <input type="text" name="" v-model="answer.option" placeholder="Answer" @change="updateAnswers">
      <input type="radio" :name="'correct' + this.index" value="true" v-model="answer.correct" @change="updateAnswers">
      </div>
      <div id="add-answer-btn-container" class="centered">
        <button @click="addAnswer" class="centered">+</button>
      </div>
    `,
})

app.mount('#app');
