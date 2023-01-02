import '../Styles/GroceryList.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Paper, Card, List, ListItem, ListItemIcon, ListItemText, Table, TableContainer, TableBody, TableRow, ListItemButton } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { getUid } from './userTokenManager';

const GroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [checked, setChecked] = useState([0]);
    let [toggle, setToggle] = useState(0)
    
    useEffect(() => {
        getGroceryList();
    },[toggle]);

    
    const dummy = [
        {
            "id": 5,
            "name": "Sunday Supper: Beef, Onion and Porter Stew",
            "calories": 547,
            "ingredients_array": [
                "1 1/2 -2 pounds of beef stew meat",
                "Kosher salt and cracked black pepper",
                "Vegetable oil",
                "2 tablespoons butter",
                "2 onions, chopped",
                "4-6 shallots, chopped",
                "1 small bunch thyme",
                "1 1/2 cups porter",
                "3-5 cups beef stock",
                "Chopped parsley (to garnish)"
            ],
            "recipe_source": "http://www.seriouseats.com/recipes/2011/11/beef-onion-and-porter-stew.html",
            "image_source": "https://edamam-product-images.s3.amazonaws.com/web-img/72c/72cedf135b13a74fa48e99fdc745efd5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLWVhc3QtMSJHMEUCIGQkCnUmL01OXjrh7%2BqsO9hIJbOPfQ8Y7I4Muei7u3FCAiEA51OlCoCmNAqXZbp99q4oP62fe1BPrICz7s%2BeMBeMmhkqzAQIWhAAGgwxODcwMTcxNTA5ODYiDOErY%2Bwu6PEwI9EoHiqpBPgDBfDVaC0FhzSP7bmQ%2BXuKMT9%2BiwOsLYz3bWZhCAmxi%2Bczh5L6gN9kjF26W%2B14ZC39j1c3fB8ln2Jzr%2BSNam1reAiTNB5bQjAsOAo5407ypvBD4RfyNZCR%2BThF6tRuG%2BMKt5Sn2D3%2Baw8WYOuQSnqmQzWEEJSB25hbsvFVN5nzjnlHKrwOzbDJ2dXWc%2BlUMewNFXBBZ9Nv5ZSrWI3A0mv%2BdwOH0soYEXs0knx0VbWmWPY1s5SR8Wpe7cVHfp8kcbGkydgcI47SGR%2FqEepmv6NnMUAnP3sAQKdbwiY9QwfXyi5D97wGpRTsB3t0M2l9j%2B7fSAbZeengJ0iIfe%2Fbo60eWZ59wTOd31Ukz2DC1GUWqtwzYCj9%2FolYpAgBrSNlMyQf8o2rRD8k95F63srv3ulD%2Bmw2EgIRKBKWxVVTvkH1FSwHgdJx6qxVOvj4CIAiSCL%2FVRTYVrxCfkM0et0xUrSaJzBuwM9f4H%2BbNtNmaskK%2F%2BzrlM%2FYY0H%2Bu2gXysxWh13eqsTJjGB8nQMQWBEJEaKdyam9dbZuMF7b6abdmjWS2actPqykl%2FWB6Y4AMl9P1SSebvPZGuKUDV4GhFQsu%2BlznLdTlmGU%2F4OeZ3ndPWljB4FZOBT144s%2FBO7zgm5759wUgX5F5rtQNi%2FPjghegTQQfTHD1UrCzhSvVlR%2BrEZQjtA6J5R%2BjD2oDJRV3cZ9AepLIkSdCRfNX9fy3%2FsgKpPC7VxnJ%2FOvAdcw75%2B1nQY6qQGDMzlKy%2BvU5TPo%2BMfHzPUNIJ1DBSF2r3RjBZgny3vWNdpnOBwQKt43E52V3ZZ1%2B8G%2FPWygduUEB9hBKdKCiAR8AKOk2kPa%2Fs4sqGAsqk2lqmse9RrqCi%2BmFbK%2FWwre%2BQx9c1z%2FqRtwxSm3mIsg1TMlyDZ1lsHoiMc2MLaaKkLZdhX6YlMnPd4d1F5hf7tFKuaGAVtl%2FjhYoIrE6QFx9r9KkghUpDoVqiTp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221229T091756Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFGLC23OPH%2F20221229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=434424fe35f6f24da6575065efd0bc2c0e5722f754ae999ded65382810e2365c",
            "uid": "KvQVOgImIXMkAeSIgKHYNXUGdah1"
        },{
            "id": 6,
            "name": "Sunday Supper: Beef, Onion and Porter Stew",
            "calories": 547,
            "ingredients_array": [
                "1 1/2 -2 pounds of beef stew meat",
                "Kosher salt and cracked black pepper",
                "Vegetable oil",
                "2 tablespoons butter",
                "2 onions, chopped",
                "4-6 shallots, chopped",
                "1 small bunch thyme",
                "1 1/2 cups porter",
                "3-5 cups beef stock",
                "Chopped parsley (to garnish)"
            ],
            "recipe_source": "http://www.seriouseats.com/recipes/2011/11/beef-onion-and-porter-stew.html",
            "image_source": "https://edamam-product-images.s3.amazonaws.com/web-img/72c/72cedf135b13a74fa48e99fdc745efd5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIEEciEm6DdRF09xzRtFESOG0T7WyW%2FycPrh2XuUiASSnAiBzCH%2BH%2FASzE%2F8H3K5x6OI3hGbIsdXTr%2FY2X0cNXeJ%2FaCrMBAhgEAAaDDE4NzAxNzE1MDk4NiIMSrM5JRAJWxbf9SSMKqkE6J2I4DCFzTLZndmmbiW0vlcSEpEkFWsaqUdxdlcuZLtxjgz%2Bc7NCUfmDxIjI6tpyM29wIalEUua4fJ%2Bwn7TPhjLhpCbI95cAB5ZsA%2F16j%2B77pJsvbVavLzv1OP53%2F%2BmvwBZsrK%2BCz%2B%2BXuDdO828LH9ZZzceCHZqzHGXF%2B5Nm7RZmDoUZSAS1IqG8ZGBzC29jJOwhVexNn%2Fp8FFYfQe2k%2FftjoUW6QLyAE1Be%2FRv2v6mA4n9zrRqJEFCydO0I5WXf3s27BjG0dx9VpbGuM%2BGjBEjhKQJfKF4xwHlLkPGYBYU8x7sr6uksjAA9pdQjZzamBfCOy9z%2BurtzKDZChFblrrE2XYhtHg5KW73amWv%2B%2FfiBETOZQnQRjEGFBbvFJGHSXTcp8dK58HxfKRAU8cOOrk14PSQ4oznwyRkuMf4Lq6VfhROMCtbKNlNRxtNiRzfKVjfW8gk4Bn9jb%2F3kUHwxm%2BZOVa%2FHzPwuQYcm4Rs1sLzU962pDDQVoghfjE2W7LbdynUao%2FxK%2FcNTWbCnzCXQUMiPBEFkQbp8OxvEKQKihYIwUYP%2BGls4UxVvSIiuUsRR1qlyRrNfoKFvUwPim0i8jJGSAJTHFEfsmG3WEAFCn0YL7lrXFoldVt6YYKI2XbUXOZtJmrBoDJgOQzZxVDGyCuPbGYE%2BQnbQ5UJ1pqDj6fSE4O0icEJaIrumvVBBkkVqH3yaMv4CEs7T2JkPthShBaS8SVAURTe2kDCy1badBjqqAcKnca7CmwIbfYMDKbnoqA5CIkP1xJ9ILTB%2Bu0iZeEG33pmm8wPgLJwp99LbqxbH%2BT6%2F%2BGRSyPLdMzehvREm7V22XZu1S8M7SSagabLBQ6gwmKwWul3PhdZP1Wy1oKgEFn21D87ca7HtVeFK2uTnbasfTZi8yoOzORpEn47vsuLtwDe3z5SE5w7Ljbu0RBFV4ghkMdTpqw7%2FvopgvC4VC0p7H78qfDspEUnf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221229T154309Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFGPVWRLMY%2F20221229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c28f02ad541efa9aca9edd0d55cc18598c25c34c0a92a24b415270f5ed1be1b5",
            "uid": "KvQVOgImIXMkAeSIgKHYNXUGdah1"
        },
        {
            "id": 7,
            "name": "Tomato-Glazed Meatloaves with Brown Butter Mashed Potatoes recipes",
            "calories": 1064,
            "ingredients_array": [
                "4 teaspoons vegetable oil",
                "1/4 cup (60 grams) tomato paste",
                "2 tablespoons cider vinegar",
                "2 teaspoons honey",
                "2 teaspoons Worcestershire sauce",
                "2 teaspoons smooth dijon mustard",
                "1/4 teaspoon table salt",
                "2 slices sandwich bread",
                "1/2 medium onion, roughly chopped",
                "1 garlic clove, chopped",
                "1 medium stalk celery, roughly chopped",
                "1 medium carrot, roughly chopped",
                "olive oil",
                "1 teaspoon fine sea or table table salt, plus more for vegetables",
                "freshly ground black pepper",
                "2 pounds ground beef",
                "2 large eggs",
                "1 tablespoon tomato paste",
                "1 teaspoon dijon mustard",
                "1 teaspoon smoked paprika",
                "2 tablespoons Worcestershire sauce",
                "1/4 cup chopped fresh flat-leaf parsley",
                "1/2 cup (120 grams) milk",
                "2 pounds (905 grams) yukon gold potatoes (about 6)",
                "8 tablespoons (4 ounces or 115 grams) unsalted butter",
                "1 cup (235 ml) buttermilk",
                "1 teaspoon fine sea or table salt",
                "ground black pepper"
            ],
            "recipe_source": "https://smittenkitchen.com/2017/02/tomato-glazed-meatloaves-with-brown-butter-mashed-potatoes/",
            "image_source": "https://edamam-product-images.s3.amazonaws.com/web-img/742/742bc34b23fd417c9dd79ef8b01904f7?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLWVhc3QtMSJHMEUCIQCc8AeZ6%2FCTgTyhqFX77E0%2B%2FZeZFIpaN1QE%2Fv645vMyrwIgJoegbJvoMr5bpbRSEznw%2BxChLbslcvh0HcKdApfzhpIqzAQIYBAAGgwxODcwMTcxNTA5ODYiDA9igEChD4AdXFetuiqpBBfIhn7KL2s5sKbpsg0MEQN5hfJAhIxHUj92oFCKgRroOIy4C%2B2M5%2F3IEOTutJySH8zMabqNJEvc6HlKTCicldZpGlS3BCdPPFUt%2FcfZ6DvhfRZ82xmeCRXed0SoD6ZbGaaCeoy%2BZG%2B1BdxW5yhHUJQZZ3m7irqdzlbA2KGM2d0DV0%2FLMNPdeAwuVxrfVpiZKNXjLvo3bUCrcRsfzryv7wNde2i7qR1i4Gus8kp8q2khpqGi%2BUJjAnAXAtPa3%2BGxjNf%2BYENt2ctzk1IhmgnrfRTbAe%2B3hXNGT2377%2BTlvgKYll4gYZT0mOMngbX6rIlSUFrKm366396wfis14mkWUOm22evvHZ6JMYZhAxyCJWkWjotZE2ZRu46SuohXHAg6Ptmo64Qlh%2B1fCiTo1CIW1ZmQzDFqFEtI54JV7KHvWy0gIalY3jrFa8mbQG%2Fjh0pfs7Lm5IkHDynygO96%2BHxMpDKLmcnhSaFIGjY9AGgpJpf7fjiuACuay%2BTxMae%2FowJSGzZPrJ%2FPfmYHCzkyuNxVp05dntTZaqncdt0neBHV0Pjnpvc6xX7W6VElOahYLNS2DPfs4bqyK3GBzMg%2BDGtKmU%2B%2FnMsGbqGSqjdhYjglFAp%2BEcwTF9oRVzKfFYu7n%2BHGBM%2F3PTeliV8o0%2BgjGEXEaHhTUbT%2FVEJVfU55QOVVQP%2FmrHr6GTM%2BBhAxYivc4IUy4wgCwj3frJ%2BcUI%2BfCiY06QxXo6BUcthFUUkw0uC2nQY6qQEu06G3CR2q2zdTNqxmv0c6n9W3C%2FHHEu2eYB6ANeR2AWbPEpArlSm7SlCI5p6LrF0JsqhXgxNGPpi86RR36hcpkRE58ii%2BPtuq2BhzMl%2Fx4k09k5jVzbKvx0b0P9uj%2B7%2BzYzIoB4AUuREBAKwf95kHgbcvYGWR7WVFBggbl68ukwomIpHbgr4plJJmynKKd%2B8HfVKFFQnMBzoIB6C0%2BcHiQ7Zshl3A1VCE&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221229T164914Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFJZHTPI7C%2F20221229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1f3a4c2fed2e22a3562e2c808b728f25c759d513f59b75d87d7ab5897fb3ba78",
            "uid": "KvQVOgImIXMkAeSIgKHYNXUGdah1"
        },
        {
            "id": 8,
            "name": "Beef Bourguignon (Pinot Noir) with honey glazed carrots",
            "calories": 680,
            "ingredients_array": [
                "1.25 pounds chuck roast",
                "1.5 cups red wine",
                "1 cup water",
                "1 tablespoon tomato paste",
                "2 tablespoons fresh thyme",
                "2 clove garlic",
                "1/2 onion",
                "3 large carrots",
                "1 tablespoon butter",
                "1 tablespoon honey"
            ],
            "recipe_source": "https://food52.com/recipes/77150-beef-bourguignon-pinot-noir-with-honey-glazed-carrots",
            "image_source": "https://edamam-product-images.s3.amazonaws.com/web-img/f1e/f1eb5b965590ad3229a583cd21f6c1a0.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLWVhc3QtMSJHMEUCIQCc8AeZ6%2FCTgTyhqFX77E0%2B%2FZeZFIpaN1QE%2Fv645vMyrwIgJoegbJvoMr5bpbRSEznw%2BxChLbslcvh0HcKdApfzhpIqzAQIYBAAGgwxODcwMTcxNTA5ODYiDA9igEChD4AdXFetuiqpBBfIhn7KL2s5sKbpsg0MEQN5hfJAhIxHUj92oFCKgRroOIy4C%2B2M5%2F3IEOTutJySH8zMabqNJEvc6HlKTCicldZpGlS3BCdPPFUt%2FcfZ6DvhfRZ82xmeCRXed0SoD6ZbGaaCeoy%2BZG%2B1BdxW5yhHUJQZZ3m7irqdzlbA2KGM2d0DV0%2FLMNPdeAwuVxrfVpiZKNXjLvo3bUCrcRsfzryv7wNde2i7qR1i4Gus8kp8q2khpqGi%2BUJjAnAXAtPa3%2BGxjNf%2BYENt2ctzk1IhmgnrfRTbAe%2B3hXNGT2377%2BTlvgKYll4gYZT0mOMngbX6rIlSUFrKm366396wfis14mkWUOm22evvHZ6JMYZhAxyCJWkWjotZE2ZRu46SuohXHAg6Ptmo64Qlh%2B1fCiTo1CIW1ZmQzDFqFEtI54JV7KHvWy0gIalY3jrFa8mbQG%2Fjh0pfs7Lm5IkHDynygO96%2BHxMpDKLmcnhSaFIGjY9AGgpJpf7fjiuACuay%2BTxMae%2FowJSGzZPrJ%2FPfmYHCzkyuNxVp05dntTZaqncdt0neBHV0Pjnpvc6xX7W6VElOahYLNS2DPfs4bqyK3GBzMg%2BDGtKmU%2B%2FnMsGbqGSqjdhYjglFAp%2BEcwTF9oRVzKfFYu7n%2BHGBM%2F3PTeliV8o0%2BgjGEXEaHhTUbT%2FVEJVfU55QOVVQP%2FmrHr6GTM%2BBhAxYivc4IUy4wgCwj3frJ%2BcUI%2BfCiY06QxXo6BUcthFUUkw0uC2nQY6qQEu06G3CR2q2zdTNqxmv0c6n9W3C%2FHHEu2eYB6ANeR2AWbPEpArlSm7SlCI5p6LrF0JsqhXgxNGPpi86RR36hcpkRE58ii%2BPtuq2BhzMl%2Fx4k09k5jVzbKvx0b0P9uj%2B7%2BzYzIoB4AUuREBAKwf95kHgbcvYGWR7WVFBggbl68ukwomIpHbgr4plJJmynKKd%2B8HfVKFFQnMBzoIB6C0%2BcHiQ7Zshl3A1VCE&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221229T165019Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFJZHTPI7C%2F20221229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a7306ca87f6cc83bff4d84616d1c4420c01061e38431bf6f4a6ae169000ce089",
            "uid": "KvQVOgImIXMkAeSIgKHYNXUGdah1"
        },
        {
            "id": 9,
            "name": "Ultimate Veggie Burger recipes",
            "calories": 199,
            "ingredients_array": [
                "2 1/2 cups sprouted garbanzo beans (chickpeas) OR canned garbanzos, drained and rinsed",
                "4 large eggs",
                "1/2 teaspoon fine-grain sea salt",
                "1/3 cup chopped fresh cilantro",
                "1 onion, chopped",
                "Grated zest of one large lemon",
                "1 cup micro sprouts, chopped (try brocolli, onion, or alfalfa sprouts - optional)",
                "1 cup toasted (whole-grain) bread crumbs",
                "1 tablespoon extra-virgin olive oil (or clarified butter)"
            ],
            "recipe_source": "http://www.101cookbooks.com/archives/001567.html",
            "image_source": "https://edamam-product-images.s3.amazonaws.com/web-img/96f/96fa882115352ecb668b32a0621f8ecd?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJHMEUCIQCbJQZ%2B5Lec%2BmCSrBVheI7NWI0eFC%2FSq5v6bYHWpn6CPAIgIDBy76sgRpipT7d%2B%2Bq2iapkvOQzzS07aUa0lvvSUcj0qzAQIdxAAGgwxODcwMTcxNTA5ODYiDICVuBzv2qMKnboPDiqpBHWNbjcecDpQWu5uGg5XDCrgFP1BoGA85CkndJvCQ8WqXgvgruypiQB0N0KuRRb6hlVIItZVvAKxGYgynwZCtYUoQknCDSqTG%2BWaK5SF3oQBE8FaSB7xAoLncyhVBgeWtNxvi7vIOY1ZcQmMAmFpGGv4GTLa2naUWh6xwUuSIdCoVEfFecMImPpn3GW40YDxA70%2BKVnX0wyDRDFMPXaAfy6r393iVjCHknE2tkIwsA%2Fpfw9pQkhzAI4tSQ2gc042%2BBDmHhV6t8S8HDBVq0UwfffxIl9qjtjaMWkuFJIe9paIHIjol4HqCUl%2F%2BUmC1X0msLl0HcTNbeAbyDCKh21SzUEqAjVwAHL3gRDSclx09%2BA0VVnJRdABmscqZQKAvcMOVwJUdjhnJO%2BkGfDQyERQ0hTpxlRATHXzjos5uXSpfoWoJUNmNTqi2U2i59QrRGHn9BUU3MRJveDBGodLZdbSacTsW%2FBqYD6BIe%2Bpjvt1pvYrT3nvs2F3FDeKyBt8AeEiitTZYD1yCYUL%2FpTkmA%2Fxm7LVoszwO5cp4UiuS0XwbOHQXCNOLUO7o9jN562WV2LfHdK3aScTf7m03u9t0KXJRLJIG2pAvyQOW5rZPUDAG7P250o%2B%2Bxit%2BCyASsosMht%2FWd4iJ34UPAa9KFyohs%2Bfb%2FezPpLIYCs4z26JCM52bEwXGsA0PrrVblVfjz2R6iuztlQMbmD8SbMtiJIYHMvykbD36INn5RAaL3MwiOe7nQY6qQHQyqOQBxp1cI%2B93UjtEqOqP80EuF95pYZ2Gyxlb084aShIcEQ1J2CGQGCZloXLv%2BcYZ7bCzWTLMEt3XDcJFvruJlKfBcOyakdm5%2F8xTJjAn23IBCArb%2BFe6sdxfITbek3IEkJa%2BKO3llccp8nadG78mVY5GhLLshdttT3dciyg4%2BDWOjux0IuB8men9yruZD6UVVoViGOGjmxx%2FFqWh3PkMrEsiL5u4N6l&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221230T154955Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6YW7QNO%2F20221230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=77ffcf61a00efa96c173779d038dfc04c7b5ddbd7018dfb73e6c848badaa16fe",
            "uid": "KvQVOgImIXMkAeSIgKHYNXUGdah1"
        },
    ]
    const handleChange = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log(newChecked)
    };

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    async function removeGroceryList (id) {
        try {
            await axios.delete(`/grocery_list/${id}`)
        } catch (error) {
            console.log(error);
        };
        setToggle(toggle++);
    };
    
    async function getGroceryList () {
        // const fetchedList = await axios.get(`/grocery_list/${getUid()}`);
        const list = dummy.map((list) => {
            const id = list.id;
            const name = list.name;
            const ingredientsArray = list.ingredients_array;
            const recipeSource = list.recipe_source;
            const imageSource = list.image_source;
            const ingredientsCheckList = ingredientsArray.map((ingredient) => {
                const value = ingredientsArray.indexOf(ingredient)
                return <ListItem
                        sx={{maxHeight: '90%'}}
                        disablePadding
                        >
                            <ListItemButton onClick={(e) => {
                                e.preventDefault();
                                handleChange(value);
                            }}>
                                <ListItemIcon>
                                    <CheckBox
                                        disableRipple
                                        edge="start"
                                        tabIndex={-1}
                                        checked={checked.indexOf(value) !== -1}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={ ingredient } />

                            </ListItemButton>
                    </ListItem>
            });
            
            
            return <div className='list__card__container'>
                <Card
                    elevation={5}
                    className='list__card'
                    sx={{height: '100%'}}
                >
                    <div className='recipe__image__container'>
                        <img className='recipe__image' src = { imageSource } alt='recipe'/>
                        <p className='recipe__name'>{ name }</p>
                    </div>
                    <List 
                        sx={{
                            maxHeight: '60%',
                            width: '90%',
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                        }}
                        >
                        { ingredientsCheckList }
                    </List>
                    <div className='buttons__container'>
                        <Button
                            variant='contained'
                            onClick={() => openInNewTab(recipeSource)}
                            >Recipe
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => removeGroceryList(id)}
                            >Delete
                        </Button>
                    </div>
                </Card>
            </div>
            
        });
        setGroceryList(list);
    }


    return <div className='page__container'>
        <TableContainer
            elevation='5'
            sx={{width: '98%', height: '97%'}}
            component={Paper}
        >
            <Table>
                <TableRow>
                    <div className="grocery__lists__container">
                            { groceryList }
                    </div>
                </TableRow>
            </Table>
        </TableContainer>
    </div>
};

export default GroceryList;