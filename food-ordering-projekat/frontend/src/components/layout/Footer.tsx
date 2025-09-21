import { Footer as FlowFooter } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

import LogoShort from "../../assets/logo-short.png";

const Footer = () => {
  return (
    <div className="bg-red-600">
      <FlowFooter container className="bg-red-800">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="text-gray-50">
              <FlowFooter.Brand
                className="text-gray-50"
                href="/"
                src={LogoShort}
                alt="Logo"
                name="Food"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FlowFooter.Title className="text-gray-50" title="about" />
                <FlowFooter.LinkGroup col className="text-gray-50">
                  <FlowFooter.Link href="/">Flowbite</FlowFooter.Link>
                  <FlowFooter.Link href="/">Tailwind CSS</FlowFooter.Link>
                </FlowFooter.LinkGroup>
              </div>
              <div>
                <FlowFooter.Title title="Follow us" className="text-gray-50" />
                <FlowFooter.LinkGroup col className="text-gray-50">
                  <FlowFooter.Link href="/">Github</FlowFooter.Link>
                  <FlowFooter.Link href="/">Discord</FlowFooter.Link>
                </FlowFooter.LinkGroup>
              </div>
              <div>
                <FlowFooter.Title title="Legal" className="text-gray-50" />
                <FlowFooter.LinkGroup col className="text-gray-50">
                  <FlowFooter.Link href="/">Privacy Policy</FlowFooter.Link>
                  <FlowFooter.Link href="/">
                    Terms &amp; Conditions
                  </FlowFooter.Link>
                </FlowFooter.LinkGroup>
              </div>
            </div>
          </div>
          <FlowFooter.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FlowFooter.Copyright
              className="text-gray-50"
              href="/"
              by="ANS™"
              year={2025}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FlowFooter.Icon
                className="text-gray-50"
                href="#"
                icon={BsFacebook}
              />
              <FlowFooter.Icon
                className="text-gray-50"
                href="#"
                icon={BsInstagram}
              />
              <FlowFooter.Icon
                className="text-gray-50"
                href="#"
                icon={BsTwitter}
              />
              <FlowFooter.Icon
                className="text-gray-50"
                href="#"
                icon={BsGithub}
              />
            </div>
          </div>
        </div>
      </FlowFooter>
    </div>
  );
};

export default Footer;
