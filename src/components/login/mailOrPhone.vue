<template>
  <div class="papa">
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:mail"></i>
      <h2>Create a new acount</h2>
      <!-- -----------------        Email        --------------------- -->
      <vs-input v-model="user.email" border label-placeholder="Email Address" required @change="user.email = user.email.replace(/\s/g, '');">
        <template #icon>
          <i class='iconify' data-icon="mdi:contacts"></i>
        </template>
      </vs-input>
      <!-- -----------------        full name        --------------------- -->
      <vs-input v-model="user.name" border label-placeholder="Full name" required style="margin-top: 1.5rem;">
        <template #icon>
          <i class='iconify' data-icon="mdi:identifier"></i>
        </template>
      </vs-input>
      <vs-button
          :loading="isLoading"
          class="next"
          color="#5b3cc4"
          gradient
          @click="sendInfo()"
      >
        <i class="iconify" data-icon="bx:bx-right-arrow-alt"></i> next
      </vs-button>
    </div>

    <router-link style="text-decoration: none;" tag="a" to="/signin"><p class="signIn">I already have an account . sign
      in</p></router-link>
    <div class="privacy" @click="active=true">
      <span>Privacy policy</span>
    </div>
    <vs-dialog scroll overflow-hidden auto-width v-model="active" class="white">
      <template #header>
        <h3 class="white">
          Privacy Policy
        </h3>
      </template>
      <vs-button flat style="margin: 0 auto" @click="persian=true">Show Persian</vs-button>
      <div class="con-content" v-show="!persian">
        <h4 class="white">
          Information We Collect
        </h4>
        <p class="white left">
          Film Club must receive or collect some information to operate, provide, improve, understand, customize, support, and market our Services, including when you install, access, or use our Services.
        </p>
        <p class="white left">
          The types of information we receive and collect depend on how you use our Services.
        </p>
          <p class="white left">
            We require certain information to deliver our Services and without this we will not be able to provide
            our Services to you.
          </p>
<p class="white left">
  For example, you must provide your Email address to create an account to use our
  Services.
</p>

<p class="white left">          Information You Provide :</p>

        <ul>
          <li class="left white">
            <b>Your Account Information.</b> You must provide your Email address and basic information
            (including a profile name of your choice and Your full name) to create a Film Club account.
            If you don’t provide us with this information, you will not be able to create an account to use our
            Services. You can add other information to your account, such as a profile picture and "Bio" information.
          </li>
          <li class="left white">
            <b>Your posts and comments.</b> We save your posts and comments in our server but we are not
            responsible for delete of posts/comments of you in the platform
          </li>
        </ul>
        <h4 class="white">
          Automatically Collected Information
        </h4>

        <p class="white left">
          We collect information about your activity on our Services,
          like service-related, diagnostic, and performance information.
          This includes information about your activity (Including your ip address, location,
          time of visit etc). This also includes information about
          when you registered to use our Services;
        </p>
        <h4 class="white">
          How We Use Information
        </h4>
        <p class="white left">We use information we have (subject to choices you make and applicable law) to operate, provide, improve, understand, customise,
          support, and market our Services. Here's how:</p>
        <ul class="white left">
          <li><b>Our services</b> We use information we have to operate and provide our Services,
            including providing customer support, showing more related posts in the future
            and improving, fixing, and customising our Services.
            We also use information we have to understand how people use our Services;
            evaluate and improve our Services; research, develop, and test new services and features;
            and conduct troubleshooting activities. We also use your information to respond to you when
            you contact us.</li>
          <li>
            <b>Third-Party Banner Ads.</b> We still do not allow third-party banner ads on our Services.
            We have no intention to introduce them, but if we ever do,
            we will update this Privacy Policy
          </li>
        </ul>
        <h4 class="white">
          Your data safety
        </h4>
        <p class="white left">We care about care data privacy and because of that we use ssl for a safe
        communication and crypt all passwords with an string strategy
        </p>
        <h4 class="white">
          Contact us
        </h4>
        <p class="white">If you face any problems in any use of our service or you have any questions contact us at:</p>
        <p class="white">support@filmclub.top</p>
      </div>
      <div class="con-content fontIr" v-show="persian">
        <h4 class="white">
          چه اطلاعاتی جمع آوری می‌شود
        </h4>
        <p class="white right">
          فیلم کلاب برای بهره برداری ، ارائه ، بهبود ، درک ، شخصی سازی ، پشتیبانی و بازاریابی خدمات  ، از جمله هنگام نصب ،برای دسترسی یا استفاده از خدمات ، باید برخی از اطلاعات را دریافت یا جمع آوری کند.
        </p>
        <p class="white right">
          انواع اطلاعاتی که دریافت و جمع آوری می کنیم به نحوه استفاده شما از خدمات ما بستگی دارد.
        </p>
        <p class="white  right">
          ما برای ارائه خدمات خود به اطلاعات خاصی نیاز داریم و بدون اینها قادر به ارائه خدمات به شما نخواهیم بود
        </p>
        <p class="white right">
          به عنوان مثال ، شما باید آدرس ایمیل خود را برای ایجاد یک حساب کاربری برای استفاده از خدمات  ما ارائه دهید
        </p>

        <p class="white right">       :   اطلاعاتی که شما ارائه می دهید</p>

        <ul dir="rtl">
          <li class="right white" >
            <b>
              اطلاعات حساب شما
            :
            </b>
            شما باید آدرس ایمیل و اطلاعات اولیه خود را ارائه دهید
            (از جمله نام نمایه به انتخاب خود و نام کامل شما) برای ایجاد حساب کاربری فیلم کلاب.
            اگر این اطلاعات را در اختیار ما قرار ندهید ، نمی توانید برای استفاده خدمات ما یک حساب کاربری ایجاد کنید
            در ادامه میتوانید تصویر پروفایل و بیگرافی خود را نیز اضافه کنید
          </li>
          <li class="right white">
            <b>پست ها و نظرات شما :</b>
            ما پست ها و نظرات شما را در سرور به صورت امن نگهداری میکنیم اما مسئولیت حذف پست ها
            و نظرات بر عهده فیلم کلاب نمی باشد
          </li>
        </ul>
        <h4 class="white">
          جمع آوری خودکار اطلاعات
        </h4>

        <p class="white right">
          ما اطلاعات مربوط به فعالیت شما را در سرویس های خود جمع آوری می کنیم ،
          مانند اطلاعات مربوط به خدمات ، تشخیص و عملکرد.
          این شامل اطلاعات مربوط به فعالیت شما
          ( IP ، مکان ،
          زمان بازدید و غیره)
          و همچنین این داده ها  شامل اطلاعات مربوط به
          زمان استفاده از سرویس نیز می باشد
        </p>
        <h4 class="white">
          نحوه استفاده ما از اطلاعات
        </h4>
        <p class="white right">ما برای عملکرد ، ارائه ، بهبود ، درک ، سفارشی کردن ، از اطلاعاتی که داریم (مشروط به انتخاب شما و قانون قابل اجرا) استفاده می کنیم.
            نحوه اجرا به صورت زیر است
        </p>
        <ul class="white right" dir="rtl">
          <li><b>خدمات ما</b> ما از اطلاعاتی که برای کارکردن و ارائه خدمات خود داریم ، استفاده می کنیم ،
            از جمله ارائه پشتیبانی مشتری ، نمایش پستهای مرتبط بیشتر در آینده
            و بهبود ، اصلاح و شخصی سازی خدمات ما.
            ما همچنین از اطلاعاتی استفاده می کنیم که باید بفهمیم مردم چگونه از خدمات ما استفاده می کنند.
            خدمات ما را ارزیابی و بهبود می بخشند. تحقیق ، توسعه و آزمایش خدمات و ویژگی های جدید ؛
            و فعالیت های عیب یابی را انجام می دهیم. ما همچنین از اطلاعات شما برای پاسخگویی به شما  می کنیم
            </li>
          <li>
            <b>تبلیغات بنر شخص ثالث.</b> ما هنوز تبلیغات بنر شخص ثالث را در سرویس های خود مجاز نمی دانیم.
            اما اگر تصمیمات عوض گردد این شرایط حریم خصوصی را تغییر می دهیم و به اطلاع شما می رسانیم
          </li>
        </ul>
        <h4 class="white">
          امنیت داده های شما
        </h4>
        <p class="white right">
          ما به امنیت داده های شما اهمیت می دهیم

          و به همین منظور استراتژی های مختلف امنیتی را در پلتفرم ایجاب کرده ایم
          <br>
          از جمله انتقال امن با اس اس ال و رمزنگاری یک طرفه پسورد ها
        </p>
        <h4 class="white">
          ارتباط با ما
        </h4>
        <p class="white">
          در صورت وجود هر گونه ابهام یا مشکل در رابطه با شرایط و خدمات فیلم کلاب از طریق ایمیل زیر با ما در ارتباط باشید
        </p>
        <p class="white">support@filmclub.top</p>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "mailOrPhone",
  data() {
    return {
      user: {
        email: '',
        name: ''
      },
      isLoading: false,
      errMsg: '',
      active: false,
      persian: false
    }
  },
  computed: {
    ...mapState(['isMailAvailable', 'errMassage'])
  },
  methods: {
    ...mapActions(['checkMailAvailable']),
    validEmail() {
      // check if inputs are empty
      if (this.user.email === '' || this.user.name === '') {
        this.errMsg = 'Please  fill both fields'
        return false
      }
      // check if email is real
      this.user.email = this.user.email.replace(/\s/g, '');
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errMsg = 'This Email is not valid'
      return re.test(this.user.email)
    },
    sendInfo() {
      if (!this.validEmail()) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#5b3cc4',
          title: this.errMsg,
        })
        this.$store.commit('changeErrMsg', null)
        return
      }
      this.isLoading = true
      // server side email check
      this.checkMailAvailable(this.user).then(() => {
        this.isLoading = false
        if (this.isMailAvailable) {
          // go next level
          this.$emit('doneMail')
        } else {
          this.$vs.notification({
            duration: 4000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: '#5b3cc4',
            title: this.errMassage,
          })
          this.$store.commit('changeErrMsg', null)
        }
      })
    }
  }
}
</script>

<style scoped>
.papa >>> .vs-input {
  background-color: #121818FF !important;
  width: 100%;
  color: white;

}

.username >>> .vs-input__label {
  width: 80%;
}

.username {
  margin-top: 9rem;

}

.papa >>> .vs-input-parent {
  flex-direction: row;
}

.papa >>> .vs-input-content {
  width: 80%;
  max-width: 500px;
  text-align: left;
}

.papa >>> .vs-input__icon {
  background-color: var(--vs-navs) !important;
}

.logoUser {
  font-size: 70px;
  margin-bottom: 0;
}

.next {
  margin: 2.5rem auto 0;
}

.papa >>> .vs-button {
  width: 80%;
  max-width: 500px;
}

.signIn {
  margin-top: 2rem;
  color: #5b3cc4;
}

h2 {
  margin-bottom: 1.5rem;
}
.privacy{
  font-size:14px;
  width:100%;
  text-align: center;
  color: #aaaaaa;
  margin-top:2rem;
}
.white{
  color: #b6b6b6;
}
.privacy p{
  color: white;
}
.left{
  text-align: left;
}
.right{
  text-align: right;
  line-height: 2;
}
.fontIr{
  font-family: Yekan;
}
</style>