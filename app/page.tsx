import "@/app/globals.css";
import OWLink from "./components/OWLink";

export default function Home() {
  return (
    <>
      <h1 className="text-center">OliviaWeb</h1>
      <p>
        Hello there! This is a site that is meant to showcase an OpenWeb SSO
        experience.
      </p>
      <p className="mt-5">
        OpenWeb can support one of two types of registration flows:
      </p>
      <h2 className="font-medium mt-5">
        OpenWeb's Built-in Registration Flow (nonSSO)
      </h2>
      <ul className="p-3">
        <li className="p-3">
          Conversation will come with an out-of-the-box registration solution
          for publishers who do not have their own user management or
          registration systems.
        </li>
        <li className="p-3">
          No additional development work needed, built in registration flow that
          works once Conversation is implemented.
        </li>
      </ul>
      <p>Here are some examples of OpenWeb's nonSSO registration flow:</p>
      <ul className="pb-5 p-3">
        <li>
          <OWLink href="https://www.spotim.name/Olivia/OliviaWeb/plants.html">
            OliviaWeb
          </OWLink>{" "}
          (Olivia's nonSSO test site)
        </li>
        <li>
          <OWLink href="https://www.thedrive.com/news/oscar-mayer-wienermobile-shuts-down-chicago-highway-after-crashing-into-a-car-and-rolling-over">
            The Drive
          </OWLink>
        </li>
        <li>
          <OWLink href="https://www.refinery29.com/en-us/you-beck-mediocre-white-women-pop-culture">
            Refinery29
          </OWLink>
        </li>
      </ul>
      <p className="leading-7">
        Notice the behavior when a user goes to log in or register with OpenWeb.
        On publisher sites with OpenWeb's built-in registration flow (nonSSO),
        the user is presented with the same OpenWeb popup modal for all sites.
        This is how the registration flow will appear for all sites using this
        method because OpenWeb is providing the functionality.
      </p>
      <h2 className="font-medium mt-20">
        Integrate with Publisher's Existing Registration Flow (SSO)
      </h2>
      <ul className="p-3">
        <li className="p-3">
          Conversation will come without a registration flow, and the publisher
          is expected to connect/integrate their own user management &
          registration system with OpenWeb.
        </li>
        <li className="p-3">
          Additional development work needed, this can add anywhere from 1-4
          weeks to the estimated implementation time depending on the publisher,
          so please reach out to sales engineering for proper expecations.
        </li>
      </ul>
      <p>Here are some examples of publisher's SSO registration flow:</p>
      <ul className="pb-5 p-3">
        <li>
          <OWLink href="https://oliviaweb.oliviawissig.com/">
            OliviaWeb SSO
          </OWLink>{" "}
          (📍You are here)
        </li>
        <li>
          <OWLink href="https://www.yahoo.com/entertainment/simpsons-once-again-getting-credit-194849146.html">
            Yahoo!
          </OWLink>
        </li>
        <li>
          <OWLink href="https://www.foxbusiness.com/lifestyle/dot-launches-investigation-delta-amid-ongoing-flight-disruptions">
            Fox News
          </OWLink>
        </li>
        <li>
          <OWLink href="https://nypost.com/2024/07/23/lifestyle/what-is-fluffy-coke-sugary-drink-dubbed-diabetes-in-a-cup-is-the-hottest-beverage-of-the-summer/">
            New York Post
          </OWLink>
        </li>
      </ul>
      <p className="leading-7">
        Now, notice the difference in behavior when a user logs in or registers
        with OpenWeb. On publisher sites where they've integrated OpenWeb with
        their own user management system (SSO), the user is instead presented
        with the publisher's sign in and sign up flow. This means the
        registration modal (or separate page) will appear different for each of
        these sites because the publisher owns and manages the functionality.
      </p>
      <h2 className="font-medium mt-20">Important things to remember:</h2>
      <ul className="p-3">
        <li className="p-3">
          The publisher will always own their user data, or be able to access it
          at any time, no matter the registration method. This is in compliance
          with GDPR & CCPR regulations.
          <ul className="pt-3">
            <li className="p-1">
              If they are nonSSO, we can get them their user data via scheduled
              or manual reports.
            </li>
            <li className="p-1">
              If they are SSO, the publisher can use our{" "}
              <OWLink href="https://developers.openweb.com/docs/export-and-delete-user-data">
                Export and Delete User Data
              </OWLink>{" "}
              API.
            </li>
          </ul>
        </li>
        <li className="p-3">
          It is possible, but extremely inconvenient for publishers to make the
          switch from nonSSO to SSO (or vise-versa). To make the registration
          change, Partner Support is required to make updates to the network &
          Spot ID configuration which forces a disconnect/detachment for all
          users from the Spot ID.
          <br></br>
          <br></br>
          Essentially, comments will remain but they will be read-only and
          cannot be linked to any new users. The publisher will also be expected
          to re-register existing users with the new registration method. This
          is a semi-complicated process, so feel free to reach out to sales
          engineering to help set proper expectations.
        </li>
      </ul>
      <h2>Feel free to visit my article pages and check it out for yourself:</h2>
      <OWLink href="/articles"><h2>Articles</h2></OWLink>
    </>
  );
}
