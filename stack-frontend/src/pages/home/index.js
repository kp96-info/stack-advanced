import React, { useState } from "react";
import { Col, Form, FormLabel, Row } from "react-bootstrap";
import { api } from "../../shared/functions";

export default function HomePage() {
  const [formData, setFormData] = useState({
    page: 0,
    pagesize: 0,
    order: "desc",
    sort: "activity",
    fromdate: "",
    todate: "",
    min: 0,
    max: 5,
    q: "",
    accepted: "",
    answers: "",
    closed: "",
    migrated: "",
    body: "",
    notice: "",
    nottaged: "",
    tagged: "",
    title: "",
    user: "",
    url: "",
    views: 100,
    wiki: "",
  });
  const [data, setData] = useState();

  const submit = async (e) => {
    e.preventDefault()
    const response = await api(
      "GET",
      "http://127.0.0.1:8000/api/search",
      formData
    ).then((res) => {
      setData({ ...res });
    });
  };

  return (
    <div className="home-container">
      <h3>Call Stackoverflow API with query parameters</h3>
      <br />
      <Form onSubmit={(e) => submit(e)}>
        <Row>
          <Form.Group as={Col}>
            <FormLabel>Page</FormLabel>
            <Form.Control
              key="id_page"
              type="number"
              name="page"
              value={formData.page}
              onChange={(e) => {
                setFormData({ ...formData, page: parseInt(e.target.value) });
              }}
              placeholder="Page"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Pagesize</FormLabel>
            <Form.Control
              key="id_pagesize"
              type="number"
              name="pagesize"
              value={formData.pagesize}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  pagesize: parseInt(e.target.value),
                });
              }}
              placeholder="Pagesize"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Fromdate</FormLabel>
            <Form.Control
              key="id_fromdate"
              value={formData.fromdate}
              onChange={(e) => {
                setFormData({ ...formData, fromdate: e.target.value });
              }}
              type="date"
              name="fromdate"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Order</FormLabel>
            <Form.Control
              name="order"
              key="id_order"
              as="select"
              value={formData.order}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  order: e.target.value,
                });
              }}
            >
              <option value="desc">desc</option>
              <option value="asc">asc</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Sort</FormLabel>
            <Form.Control
              name="sort"
              as="select"
              value={formData.sort}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  sort: e.target.value,
                });
              }}
            >
              <option value="activity">activity</option>
              <option value="votes">votes</option>
              <option value="creation">creation</option>
              <option value="relevance">relevance</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <FormLabel>Todate</FormLabel>
            <Form.Control
              key="id_todate"
              type="date"
              name="todate"
              value={formData.todate}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  todate: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Min</FormLabel>
            <Form.Control
              key="id_min"
              type="date"
              name="min"
              value={formData.min}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  min: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Max</FormLabel>
            <Form.Control
              key="id_max"
              type="date"
              name="max"
              value={formData.max}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  max: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Q</FormLabel>
            <Form.Control
              key="id_q"
              type="text"
              name="q"
              placeholder="Q"
              value={formData.q}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  q: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Accepted</FormLabel>
            <Form.Control
              key="id_accepted"
              name="accepted"
              as="select"
              value={formData.accepted}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  accepted: e.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Answers</FormLabel>
            <Form.Control
              key="id_answers"
              placeholder="Answers"
              type="number"
              name="answers"
              value={formData.accepted}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  accepted: parseInt(e.target.value),
                });
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <FormLabel>Body</FormLabel>
            <Form.Control
              key="id_body"
              name="body"
              type="text"
              placeholder="Body"
              value={formData.body}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  body: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Closed</FormLabel>
            <Form.Control
              key="id_closed"
              name="closed"
              as="select"
              value={formData.closed}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  closed: e.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Migrated</FormLabel>
            <Form.Control
              key="id_migrated"
              name="migrated"
              as="select"
              value={formData.migrated}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  migrated: e.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Notice</FormLabel>
            <Form.Control
              key="id_notice"
              name="notice"
              as="select"
              value={formData.notice}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  notice: e.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <FormLabel>Nottagged</FormLabel>
            <Form.Control
              key="id_nottagged"
              type="text"
              name="nottagged"
              placeholder="Nottagged"
              value={formData.nottaged}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  nottaged: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Tagged</FormLabel>
            <Form.Control
              key="id_tagged"
              name="tagged"
              type="text"
              placeholder="Tagged"
              value={formData.tagged}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tagged: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Title</FormLabel>
            <Form.Control
              key="id_title"
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>User</FormLabel>
            <Form.Control
              key="id_number"
              name="user"
              type="number"
              placeholder="User"
              value={formData.user}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  user: parseInt(e.target.value),
                });
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <FormLabel>Url</FormLabel>
            <Form.Control
              key="id_url"
              name="url"
              type="text"
              placeholder="Url"
              value={formData.url}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  url: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Views</FormLabel>
            <Form.Control
              key="id_views"
              name="views"
              type="number"
              placeholder="Views"
              value={formData.views}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  views: parseInt(e.target.value),
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <FormLabel>Wiki</FormLabel>
            <Form.Control
              name="wiki"
              key="id_wiki"
              name="wiki"
              as="select"
              value={formData.wiki}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  wiki: e.target.value,
                });
              }}
            >
              <option value=""></option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <button type="submit" className="mt-2 btn btn-primary">
          Send
        </button>
        <pre className="display-data">{JSON.stringify(data, null, 2)}</pre>
      </Form>
    </div>
  );
}
