import styles from "./page.module.css";
const PrivaryPolicy = () => {

    return <div className={`${styles["privary-policy"]} page-width`}>
        <h1>Privacy Policy</h1>
        <p><strong>Sanpickleball</strong> {"is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our Google application (the 'App')."}</p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
            <li><strong>Personal Information:</strong> When you sign in using your Google account, we may collect your name, email address, profile picture, and other information associated with your Google account.</li>
            <li><strong>Usage Information:</strong> We collect information about your use of the App, such as the features you use, the actions you take, and the time and duration of your activities.</li>
            <li><strong>Device Information:</strong> We collect information about the device you use to access the App, including the hardware model, operating system, and version, unique device identifiers, and network information.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
            <li>Provide, maintain, and improve the App.</li>
            <li>Personalize your experience with the App.</li>
            <li>Communicate with you, including responding to your comments and questions.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with the App.</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the rights and property of Sanpickleball and others.</li>
        </ul>

        <h2>3. Sharing Information</h2>
        <p>We do not share your personal information with third parties except in the following circumstances:</p>
        <ul>
            <li><strong>With Your Consent:</strong> We may share your information with third parties if you give us your consent to do so.</li>
            <li><strong>Service Providers:</strong> We may share your information with service providers who perform services on our behalf, such as hosting, analytics, customer service, and marketing.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if we are required to do so by law or if we believe that such action is necessary to comply with legal obligations, protect and defend our rights or property, or act in urgent circumstances to protect the personal safety of users of the App or the public.</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2>4. Security</h2>
        <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no security measures are perfect, and we cannot guarantee the security of your information.</p>

        <h2>5. Your Choices</h2>
        <p>You can:</p>
        <ul>
            <li><strong>Access and Update Your Information:</strong> You can access and update your personal information by logging into your Google account and accessing your profile settings.</li>
            <li><strong>Delete Your Account:</strong> You can delete your account by contacting us at sanpickleball@gmail.com.</li>
            <li><strong>Opt-Out of Communications:</strong> You can opt out of receiving promotional communications from us by following the instructions in those communications.</li>
        </ul>

        <h2>{"6. Children's Privacy"}</h2>
        <p>The App is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information as quickly as possible.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide additional notice (such as adding a statement to our website or sending you a notification).</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
            sanpickleball@gmail.com<br />
        </p>
    </div>;
};
export default PrivaryPolicy;