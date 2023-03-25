import { mount, RouterLinkStub } from "@vue/test-utils";
import CardItem from "@/components/molecules/CardItem.vue";
import { createStore } from "vuex";

const StarRatingStub = {
  name: "StarRating",
  template: "<div class='star-rating-stub'></div>",
};

const mockStore = {
  dispatch: jest.fn(),
};

describe("CardItem.vue", () => {
  let wrapper;
  const itemMock = {
    id: 1,
    title: "Sample Product",
    description: "Sample product description",
    image: "https://example.com/sample-image.jpg",
    price: 99.99,
    rating: { rate: 4.5, count: 10 },
  };

  beforeEach(() => {
    wrapper = mount(CardItem, {
      props: {
        item: itemMock,
      },
      global: {
        plugins: [createStore(mockStore)],
        stubs: {
          RouterLink: RouterLinkStub,
          StarRating: StarRatingStub,
        },
      },
    });
  });
  it("renders the item title, description, and image", () => {
    const routerLink = wrapper.findComponent(RouterLinkStub);
    const title = routerLink.find(".card-title");
    const description = routerLink.find(".card-text");
    const image = routerLink.find(".card-img-top");

    expect(title.text()).toBe(itemMock.title);
    expect(description.text()).toBe(itemMock.description);
    expect(image.attributes("src")).toBe(itemMock.image);
  });
  it("renders the correct price", () => {
    const price = wrapper.find(".item-price");
    expect(price.text()).toBe("$99.99");
  });
});
